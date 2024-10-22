import Link from "next/link";

function Footer() {
  return (
    <div className="flex p-5 items-center justify-between">
      <div>
        <Link href="/">
          <span className="text-lg font-semibold">
            Recipe<span>Gen</span>
          </span>
        </Link>
      </div>
      <div className="flex justify-center">
        <nav className="text-sm">
          <ul className="flex space-x-4 md:space-x-8">
            <li className="hover:underline underline-offset-2">
              <Link href="/">Terms</Link>
            </li>
            <li className="hover:underline underline-offset-2">
              <Link href="/">Privacy</Link>
            </li>
            <li className="hover:underline underline-offset-2">
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-xs">&copy; InstaDish 2024</p>
      </div>
    </div>
  );
}
export default Footer;
