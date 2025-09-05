import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 border-t border-black/20 py-4 ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left - App Info */}
        <p className="text-sm text-gray-600">
          📚 Book Social Network &copy; {new Date().getFullYear()} — Connect through books.
        </p>

        {/* Right - Links */}
        <div className="flex gap-4 text-sm text-gray-600">
          <Link to={"/contact"} className="hover:text-blue-600 transition">
            Contact  - coderrr1ck@gmail.com
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
