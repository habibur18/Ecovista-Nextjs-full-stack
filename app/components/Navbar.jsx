import Image from "next/image";
import Link from "next/link";
import SingInOut from "./auth/SingInOut";

export default function Navbar() {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/logo.png"
              width={120}
              height={138}
              alt="Eventry"
              className="h-[80px] rounded-full"
            />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li className="cursor-pointer">
            <SingInOut />
          </li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
}
