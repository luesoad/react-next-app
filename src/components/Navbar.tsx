"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../styles/navbar.scss";
import Button from "./Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Prices", href: "/prices" },
  { label: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="
        bg-[color:var(--dark-purple)]
        shadow-lg
        border-b-2 border-[color:var(--primary)]
        sticky top-0 z-40
        nav-bar
      "
    >
      <div className="max-w-screen-lg mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link
            href="/"
            className="
              text-2xl font-extrabold tracking-tight
              text-[color:var(--earth-yellow)]
              hover:text-[color:var(--coral)]
              transition-colors duration-200
              cursor-pointer
            "
          >
            React App
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="
                text-base font-medium
                text-[color:var(--nyanza)]
                hover:text-[color:var(--coral)]
                px-3 py-2 rounded-md
                transition-all duration-200
                hover:bg-[color:var(--peach-yellow)/.2]
              "
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <Button
            onClick={toggleMenu}
            className="
              text-[color:var(--earth-yellow)]
              hover:text-[color:var(--coral)]
              bg-transparent p-2 rounded
              focus:outline-none
            "
            aria-label="Open menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          fixed inset-0 z-50 bg-[color:var(--dark-purple)]/95
          flex flex-col justify-start items-start p-6
          animate-fade-in
        "
        >
          <div className="flex justify-between items-center w-full mb-6">
            <h2 className="text-xl font-bold text-[color:var(--earth-yellow)]">
              Menu
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              className="
                text-[color:var(--earth-yellow)]
                hover:text-[color:var(--coral)]
                bg-transparent p-2 rounded
                focus:outline-none
              "
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
          <div className="flex flex-col space-y-6 w-full">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  text-lg font-semibold
                  text-[color:var(--nyanza)]
                  hover:text-[color:var(--coral)]
                  px-3 py-2 rounded-md
                  transition-all duration-200
                  hover:bg-[color:var(--peach-yellow)/.2]
                  w-full
                "
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
