import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CookieBanner from "./privacy/CookieBanner";
import ChatAssistant from "./assistant/ChatAssistant";
import Analytics from "./seo/Analytics";
import Footer from "./components/Footer";
import EnquiryDrawer from "./enquiry/EnquiryDrawer";
import { SplashDone, RouteLoader } from "./loading/Splash";
import ScrollReveal from "./motion/ScrollReveal";

// Each page downloads only when it is first opened, so the site starts faster.
const Home = lazy(() => import("./pages/Home"));
const ProductsCatalog = lazy(() => import("./pages/ProductsCatalog"));
const Brands = lazy(() => import("./pages/Brands"));
const Social = lazy(() => import("./pages/Social"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DiwaliCelebration = lazy(() => import("./festive/DiwaliCelebration"));

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Suspense fallback={<RouteLoader />}>
          <SplashDone />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsCatalog />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/posts" element={<Social />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <ScrollReveal />
      <Footer />
      <EnquiryDrawer />
      <Analytics />
      <CookieBanner />
      <ChatAssistant />
      <Suspense fallback={null}>
        <DiwaliCelebration />
      </Suspense>
    </>
  );
}
