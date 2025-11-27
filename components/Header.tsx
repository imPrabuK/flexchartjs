"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Github, BarChart2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type NavItem = {
  label: string;
  href: string;
  submenu?: { label: string; href: string; description?: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Docs",
    href: "/docs",
    submenu: [
      { label: "Overview", href: "/docs/overview", description: "Get started with FlexChartJS" },
      { label: "API Reference", href: "/docs/api", description: "Detailed API documentation" },
      { label: "Tutorials", href: "/docs/tutorials", description: "Step-by-step guides" },
    ],
  },
  {
    label: "Examples",
    href: "/examples",
    submenu: [
      { label: "Gallery", href: "/examples/gallery", description: "Visual examples of all charts" },
      { label: "Dashboard", href: "/examples/dashboard", description: "Complete dashboard layouts" },
      { label: "Line Charts", href: "/examples/line/basic", description: "Line chart variations" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    submenu: [
      { label: "Blog", href: "/resources/blog", description: "Latest updates and articles" },
      { label: "Guides", href: "/resources/guides", description: "Deep dives into features" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    submenu: [
      { label: "Discussions", href: "/community/discussions", description: "Join the conversation" },
      { label: "Events", href: "/community/events", description: "Upcoming meetups and webinars" },
    ],
  },
];

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function Header() {
  const pathname = usePathname();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg transition-transform group-hover:scale-105">
            <BarChart2 size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            FlexChartJS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                    isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        hoveredNav === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.submenu && hoveredNav === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5"
                    >
                      <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" />
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block rounded-lg px-4 py-3 hover:bg-slate-50 transition-colors group"
                        >
                          <div className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                            {sub.label}
                          </div>
                          {sub.description && (
                            <div className="text-xs text-slate-500 mt-0.5">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Github size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <Link
            href="/download"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 bg-white px-6 py-4 shadow-lg"
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block text-base font-medium text-slate-900 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 border-l border-slate-100 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="text-sm text-slate-600 py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                <Link
                  href="/download"
                  className="flex w-full items-center justify-center rounded-lg bg-slate-900 py-2.5 text-sm font-medium text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
