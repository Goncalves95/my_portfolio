"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FiDownload } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            I'm Fernando<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav & hire me button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/cv/Fernando_Goncalves_2026_foto_CV_Zurich.pdf" download target="_blank" className="text-accent hover:text-accent-hover transition-all">
                  <FiDownload className="text-2xl" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download CV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link href="/contact">
            <Button>Hire me</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
