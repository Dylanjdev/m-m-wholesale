import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
    { to: "/admin", label: "Admin" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-700 tracking-tight"
            onClick={handleLinkClick}
          >
            M&M Wholesale
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Animated Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700 text-3xl focus:outline-none relative w-8 h-8"
            onClick={() => setMenuOpen(!menuOpen)}
            animate={menuOpen ? "open" : "closed"}
            initial="closed"
          >
            {/* 3-line to X animation */}
            <motion.span
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
              className="absolute left-0 top-1/2 w-8 h-[3px] bg-gray-800 origin-center"
            ></motion.span>
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="absolute left-0 top-1/2 w-8 h-[3px] bg-gray-800"
            ></motion.span>
            <motion.span
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
              className="absolute left-0 top-1/2 w-8 h-[3px] bg-gray-800 origin-center"
            ></motion.span>
          </motion.button>
        </div>

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center py-4 space-y-4 shadow-md"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={handleLinkClick}
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} M&M Wholesale • Movies N Moore
        </p>
        <p className="text-xs text-gray-500 mt-1">
          177 Dollar Dr Suite 102, Pennington Gap, VA • (276) 870-8615
        </p>
      </footer>
    </div>
  );
}

export default App;
