import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const id = "rgreg";
  let Links = [
    { name: "Articles", link: "/articles" },
    { name: "Posts", link: "/posts" },
    { name: "Profile", link: `/profile/${id}` },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full mb-20 fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-2 md:px-10 px-7">
        <Link to="/">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          NU Connect
        </div>
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center  md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8  text-xl md:my-0 my-7">
              <a
                href={link.link}
                className="text-gray-800 hover:text-gray-400 font-bold duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          <button
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500"
          >
            log in
          </button>
        </ul>
      </div>
    </div>
  );
};