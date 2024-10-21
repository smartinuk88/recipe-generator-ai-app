import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { X } from "lucide-react";
import Link from "next/link";
import UpgradeButton from "./UpgradeButton";

function BurgerMenu({
  onToggleMenu,
  menuOpen,
}: {
  onToggleMenu: () => void;
  menuOpen: boolean;
}) {
  return (
    <div
      className={`fixed top-0 left-0 z-50 p-5 -right-full w-screen h-screen bg-white transition-transform duration-500 ease-in-out ${
        menuOpen ? "transform -translate-x-0" : " transform translate-x-full"
      } flex flex-col`}
    >
      <div className="flex justify-between items-center">
        <div onClick={onToggleMenu} className="cursor-pointer">
          <X size={36} />
        </div>

        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>

      <nav className="flex items-center justify-center flex-1">
        <ul className="flex flex-col items-center justify-center space-y-8 text-2xl">
          <li className="hover:underline underline-offset-2">
            <Link href="/" onClick={onToggleMenu}>
              Create
            </Link>
          </li>
          <li className="hover:underline underline-offset-2">
            <Link href="/" onClick={onToggleMenu}>
              Explore
            </Link>
          </li>
          <li className="hover:underline underline-offset-2 text-mango-600">
            <UpgradeButton onToggleMenu={onToggleMenu} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default BurgerMenu;
