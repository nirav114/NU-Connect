import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div name="home" className="w-full h-screen">
        <div className="max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full">
          <h1 className="text-4xl sm:text-7xl font-bold">
            Welcome to NU connect
          </h1>
          <p className="py-4 max-w-[700px]">
              Nu connect is a website exclusively for students of
              particular university to connect and share contentrelated
              to academics and thoughts on university events and post
              articles, questions and theirthoughts on various topics.
          </p>
          <div>
            
              <button className="group border-2 rounded-full px-6 py-3 my-2 flex items-center border-black border-2 hover:bg-black hover:text-white hover:border-black">
              <Link to="/articles" className="font-bold no-underline hover:text-white"> Let's get started! </Link>
                <span className="group-hover:rotate-90 duration-300"></span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
