import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const { data: sesion, status }: { data: any; status: string } = useSession();

  return (
    <nav className="flex  py-2 px-24 justify-between flex-col gap-4">
      <div className="flex justify-start items-center">
        <div className="flex-shrink-0 ">
          <Image
            src="/images/logo-coffe.png"
            alt="logo"
            width={90}
            height={80}
          />
        </div>
        <div className="ml-3 justify-center">
          <h2 className="text-2xl font-bold italic text-gray-900 ">
            Coffe Valley
          </h2>
          <p className="text-sm text-gray-900 ">Taste the love in every cup!</p>
          <p className="text-gray-900 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>

      <div className="grid items-center mt-4 bg-red-500">
        <ul className="ml-5 grid grid-cols-6 place-items-center">
          <Link href={"/home"}>
            <li
              className={`mr-3 ${
                pathName === "/home" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Home
            </li>
          </Link>
          <Link href={"/catalog"}>
            <li
              className={`mr-3 ${
                pathName === "/catalog" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Catalog
            </li>
          </Link>
          <Link href={"/orderStatus"}>
            <li
              className={`mr-3 ${
                pathName === "/orderStatus" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Order Status
            </li>
          </Link>
          <Link href={"/distributors"}>
            <li
              className={`mr-3 ${
                pathName === "/distributors" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Distributors
            </li>
          </Link>
          <Link href={"/upload"}>
            <li
              className={`mr-3 ${
                pathName === "/upload" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Upload
            </li>
          </Link>
          <button onClick={() => signOut()}>
            <li
              className={`mr-3 ${
                pathName === "/logout" ? "text-yellow-300" : "text-white"
              } cursor-pointer`}
            >
              Logout
            </li>
          </button>
        </ul>
      </div>
      {/* <div>
        {status === "authenticated" ? (
          <div className="flex justify-items-center items-center gap-3">
            <Image
              width={50}
              height={50}
              src="/images/profile.png"
              alt="profile"
              className="rounded-full w-10 h-10"
              loading="lazy"
            />
            <h3 className="text-white">{sesion.user.fullname}</h3>
            <button
              className="bg-white px-3 rounded-md cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-white px-3 rounded-md cursor-pointer"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div> */}
    </nav>
  );
}
