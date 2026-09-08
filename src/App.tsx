import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import Awards from "./pages/Awards";
import AllEvents from "./pages/AllEvents";
import Articles from "./pages/Articles";
import UpcomingEvents from "./pages/UpcomingEvents";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Partners from "./pages/Partners";
import About from "./pages/About";
import LGEC from "./pages/LGEC";
import LOWS from "./pages/LOWS";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/glocon" element={<Navigate to="/lgec" replace />} />
        <Route path="/lgec" element={<LGEC />} />
        <Route path="/lows" element={<LOWS />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/upcoming" element={<UpcomingEvents />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        {/* Hidden CMS Route as requested */}
        <Route path="/add-event" element={<AddEvent />} />
        {/* Fallback route for any unmatched paths */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

