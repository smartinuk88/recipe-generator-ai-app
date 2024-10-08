"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import { useState } from "react";
import { Menu } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex fixed w-full z-40 top-0 left-0 h-20 items-center justify-between px-5">
      <BurgerMenu menuOpen={menuOpen} onToggleMenu={handleToggleMenu} />

      <div>
        <span className="font-semibold text-2xl">
          <Link href="/">
            Recipe<span className="text-bluegreen-500">Gen</span>
          </Link>
        </span>
      </div>
      <div className="hidden md:block">
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li className="hover:underline underline-offset-2">
              <Link href="/">Create</Link>
            </li>
            <li className="hover:underline underline-offset-2">
              <Link href="/">Explore</Link>
            </li>
            <li className="hover:underline underline-offset-2 text-mango-600">
              <Link href="/">Premium</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hidden md:block">
        <SignedIn>
          <UserButton showName />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      <div onClick={handleToggleMenu} className="md:hidden cursor-pointer">
        <Menu size={36} />
      </div>
    </div>
  );
}
export default Header;
