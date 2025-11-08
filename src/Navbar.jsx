import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-xl font-extrabold text-blue-900 tracking-tight"
        >
          M&amp;M Wholesale
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link to="/gallery" className="hover:text-blue-700 transition">
            Gallery
          </Link>
          <a
            href="https://www.facebook.com/moviesnmoore/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-700 transition"
          >
            Facebook
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col items-center py-4 space-y-4">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <a
            href="https://www.facebook.com/moviesnmoore/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Facebook
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
