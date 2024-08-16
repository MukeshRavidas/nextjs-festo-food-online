import Link from "next/link";
import Image from "next/image";
import fc from "../assets/icons8-facebook-30.png";
import linked from "../assets/icons8-linkedin-50.png";
import gith from "../assets/icons8-github-50.png"
export default function Footer(){
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">Festo-Food</h1>
            <p className="text-gray-400">© 2024 All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Link href="https://www.facebook.com/" className="text-gray-400 hover:text-white max-md:hidden">
                <Image src={fc.src} width={30} height={30} alt="" className="max-md:hidden"/>
            </Link>
            <Link href="https://www.linkedin.com/feed/" className="text-gray-400 hover:text-white max-md:hidden">
                <Image src={linked.src} width={30} height={30} alt="" className="max-md:hidden"/>
            </Link>
            <Link href="https://github.com/MukeshRavidas" className="text-gray-400 hover:text-white max-md:hidden">
                <Image src={gith.src} width={30} height={30} alt="" className="max-md:hidden"/>
            </Link>

            <Link href="/" className="text-gray-400 hover:text-white md:hidden">Home</Link>
            <Link href="/_components/login" className="text-gray-400 hover:text-white md:hidden">Login</Link>
            <Link href="/_components/signup" className="text-gray-400 hover:text-white md:hidden">SignUp</Link>
            <Link href="/_components/profile" className="text-gray-400 hover:text-white md:hidden">Profile</Link>
          </div>
        </div>
      </footer>
    );
  };
