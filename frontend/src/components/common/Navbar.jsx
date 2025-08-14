import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import { useDeviceType } from "../../hooks/common/useDeviceType.js";
import NeuButton from "../buttons/neuButton.jsx";
import FlyoutContent from "../other/dropdown.jsx";

const Navbar = () => {
  const { isMobile, isTab } = useDeviceType();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const initialWidthRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 10, 1);
      setScrollProgress(progress);
    };

    if (navRef.current && !initialWidthRef.current) {
      initialWidthRef.current = navRef.current.offsetWidth;
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getContainerWidth = () => {
    if (isMobile) return "95%";
    if(isTab) return "70%";
    if (!initialWidthRef.current) return "60%";

    const initialWidth = initialWidthRef.current;
    const targetWidth = window.innerWidth;
    return `${initialWidth + 0.62 * (targetWidth - initialWidth * 0.6) * scrollProgress}px`;
  };

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`bg-[#c60867] fixed z-50 transition-all duration-600 ${
        scrollProgress > 0 && !(isMobile || isTab) ? " top-0 py-3" : " top-3 py-1"
      }`}
      style={{
        width: getContainerWidth(),
        minWidth: isMobile || isTab ? "auto" : "300px",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: scrollProgress > 0 && !(isMobile || isTab) ? "0" : "10rem",
      }}
    >
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            />
          </a>

          {/* Desktop Nav */}
          {!isMobile && !isTab && (
            <div className="flex items-center space-x-8 dark:text-zinc-300">
                <FlyoutContent />
            </div>
          )}

          {/* CTA Button (Desktop only) */}
          {!isMobile && !isTab && (
            <NeuButton text="Book a Meet" />
          )}

          {/* Mobile Menu Button */}
          {(isMobile || isTab) && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-8 h-8 flex flex-col justify-center items-center group"
            >
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 my-1 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {(isMobile || isTab) && (
          <div
            className={`absolute top-full left-0 right-0 bg-zinc-200 dark:bg-zinc-800/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-bold text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 text-lg"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full px-6 py-3 bg-green-400/10 text-green-400 rounded-full border border-green-400/30 hover:bg-green-400/20 transition-all duration-300">
                <span className="text-sm font-medium uppercase tracking-wider">
                  Get Started
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};



export default Navbar;
