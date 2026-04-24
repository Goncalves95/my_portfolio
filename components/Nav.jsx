"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Press Ctrl+Shift+A to show/hide admin link
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminLink(!showAdminLink);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdminLink]);

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
      {showAdminLink && (
        <Link
          href="/admin/projects"
          className="text-red-500 font-medium hover:text-red-400 transition-all border border-red-500 px-2 rounded"
        >
          Admin
        </Link>
      )}
    </nav>
  );
};

export default Nav;
