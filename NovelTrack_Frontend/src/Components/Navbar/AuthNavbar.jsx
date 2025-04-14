import React, { useState } from "react";

// import { NavbarMenu } from "../../mockData/data.ts";
import { CiSearch } from "react-icons/ci";
import { FaBookBookmark } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { PiShoppingCartThin } from "react-icons/pi";
import ResponsiveMenu from "./ResponsiveMenu";

const AuthNavbar = () => {
  const [open, setOpen] = useState(false);
  const NavbarMenu = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "Profile",
      link: "profile/22",
    },
    {
      id: 3,
      title: "Tracking List",
      link: "#",
    },
    {
      id: 4,
      title: "Browse",
      link: "browse/",
    },
    {
      id: 5,
      title: "Recommendation",
      link: "recommendation/",
    },
  ];
  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8">
          <div className="text-3xl flex items-center gap-2 font-bold uppercase cursor-pointer">
            <FaBookBookmark />
            <p>Novel</p>
            <p className="text-secondary">Track </p>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600 ">
              {NavbarMenu.map((item) => {
                return (
                  <li className="text-2xl" key={item.id}>
                    <a
                      className="inline-block py-1 px-3 hover:text-primary font-semibold"
                      href={item.link}
                    >
                      {item.title}
                    </a>{" "}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
              <CiSearch />
            </button>

            {/* <button className="text-xl hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-6 py-2 duration-200 hidden md:block">
              LogIn
            </button>
            <button className="text-xl hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-6 py-2 duration-200 hidden md:block">
              Register
            </button> */}
          </div>

          <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <MdMenu className="text-4xl" />
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} />
    </>
  );
};

export default AuthNavbar;
