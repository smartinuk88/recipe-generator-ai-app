import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  return (
    <div className="flex fixed w-full z-50 top-0 left-0 h-20 items-center justify-between px-5">
      <div>
        <span className="font-semibold text-2xl">
          <Link href="/">
            Recipe<span className="text-bluegreen-500">Gen</span>
          </Link>
        </span>
      </div>
      <div>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li className="hover:underline underline-offset-3">
              <Link href="/">Create</Link>
            </li>
            <li className="hover:underline underline-offset-3">
              <Link href="/">Explore</Link>
            </li>
            <li className="hover:underline underline-offset-3">
              <Link href="/">Premium</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <SignedIn>
          <UserButton showName />
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
}
export default Header;
