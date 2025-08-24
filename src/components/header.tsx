import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import Github from "./icons/github";
import Image from "next/image";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Format-X Logo" width={40} height={40} />
            <h1 className="text-xl font-semibold">Format-X</h1>
          </div>

          <Button variant="outline" asChild>
            <Link
              href="https://github.com/isaias-alt/format-x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Star on GitHub</span>
              <Github className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
