import company from "../data/company";

export const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL || company.instagramFeedUrl;

const CACHE_KEY = "delux-instagram-feed-v1";
const CACHE_MS = 30 * 60 * 1000;

const sizeUrl = (sizes, ...names) => names.map((n) => sizes?.[n]?.mediaUrl).find(Boolean);

// Converts a Behold post into the shape the site renders. Tolerates missing fields so a
// change in the feed degrades to "no image" for one post rather than breaking the page.
function normalizePost(p) {
  const type = p.mediaType === "VIDEO" ? (p.isReel ? "reel" : "video") : p.mediaType === "CAROUSEL_ALBUM" ? "carousel" : "image";
  const isVideo = p.mediaType === "VIDEO";
  const image = sizeUrl(p.sizes, "medium", "large", "small") || (isVideo ? p.thumbnailUrl : p.mediaUrl);
  const children = (p.children || []).map((c) => ({
    id: c.id,
    isVideo: c.mediaType === "VIDEO",
    image: sizeUrl(c.sizes, "large", "full", "medium") || (c.mediaType === "VIDEO" ? c.thumbnailUrl : c.mediaUrl),
    videoUrl: c.mediaType === "VIDEO" ? c.mediaUrl : null,
  }));
  return {
    id: p.id,
    type,
    permalink: p.permalink,
    date: p.timestamp ? new Date(p.timestamp) : null,
    caption: (p.prunedCaption ?? p.caption ?? "").trim(),
    image,
    imageLarge: sizeUrl(p.sizes, "large", "full", "medium") || image,
    videoUrl: isVideo ? p.mediaUrl : null,
    children,
  };
}

function readCache() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (saved && saved.url === FEED_URL && Date.now() - saved.at < CACHE_MS) return saved.data;
  } catch {
    // Storage unavailable; fetch fresh.
  }
  return null;
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ url: FEED_URL, at: Date.now(), data }));
  } catch {
    // Storage full or blocked; caching is only an optimisation.
  }
}

// Returns { profile, posts }. Throws when no feed is configured or the request fails.
export async function loadInstagramFeed() {
  if (!FEED_URL) throw new Error("not-configured");
  let data = readCache();
  if (!data) {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`Feed request failed (${res.status})`);
    data = await res.json();
    writeCache(data);
  }
  const rawPosts = Array.isArray(data) ? data : data.posts || [];
  return {
    profile: Array.isArray(data) ? {} : { username: data.username, picture: data.profilePictureUrl },
    posts: rawPosts.map(normalizePost).filter((p) => p.image),
  };
}
