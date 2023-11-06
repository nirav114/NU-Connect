import React from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import axios from "./api/axios";
import { useState } from "react";
// import { useEffect } from "react";

export default function Article({ post }) {
  //   const image = "https://c4.wallpaperflare.com/wallpaper/1007/852/840/anime-girl-sadness-falling-stars-cityscape-wallpaper-preview.jpg"
  //   const title = post.title;
  //   const author = post.author;
  //   const truncatedContent = post.author;
  //   const date = "24 oct 2023";
  //   const likes = 443;
  //   const comments = 44;

  const [article, setArticle] = useState(post);

  const updateLike = async () => {
    try {
      const response = await axios.post('/article/updatelike',
          {
            articleId : post._id, 
            userId : '13445466'
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
        );
        setArticle(response.data.article)
    } catch(err) {
      console.log("error : ", err);
    }
  };

  const updateSave = async () => {
    try {
      const response = await axios.post('/article/updatesave', 
          {
            articleId : post._id, 
            userId : '13445466'
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
        );
        setArticle(response.data.article)
    } catch(err) {
      console.log("error : ", err);
    }
  };

  return (
    <>
      {/* <div className="bg-white shadow-lg rounded-lg p-2 lg:p-12 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md pb-80 mb-6">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/1007/852/840/anime-girl-sadness-falling-stars-cityscape-wallpaper-preview.jpg"
            alt=""
            className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>

        <h1 className="transition duration-700 mb-8 cursor-pointer text-center text-3xl font-semibold">
          <Link href={`/post`}>{post.title}</Link>
        </h1>
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.author} | 26 oct 2023
          </p>
        </div>
        <div className="text-center">
          <Link href={`/post`}>
            <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
              Continue Reading
            </span>
          </Link>
        </div>
      </div> */}

      <div
        className={`rounded-xl overflow-hidden bg-white mb-5 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]`}
      >
          <img
            // src={
            //   post.photo
            //     ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
            //     : images.samplePostImage
            // }
            src="https://c4.wallpaperflare.com/wallpaper/1007/852/840/anime-girl-sadness-falling-stars-cityscape-wallpaper-preview.jpg"
            alt="title"
            className="w-full object-cover object-center h-auto md:h-52 lg:h-28 xl:h-40"
          />
        <div className="p-5">
            <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
              {article.title}
            </h2>
          <div className="flex justify-between flex-nowrap items-center mt-6">
            <div className="flex overflow-hidden items-center gap-x-2 md:gap-x-2.5">
              <img
                // src={
                //   post.user.avatar
                //     ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                //     : images.userImage
                // }
                src="https://c4.wallpaperflare.com/wallpaper/1007/852/840/anime-girl-sadness-falling-stars-cityscape-wallpaper-preview.jpg"
                alt="post profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                  {article.userName}
                </h4>
              </div>
            </div>
            <span className="font-bold text-dark-light italic text-sm md:text-base">
              {new Date(article.createdAt).getDate()}{" "}
              {new Date(article.createdAt).toLocaleString("default", {
                month: "long",
              })}
            </span>
          </div>
          <div className="flex justify-between flex-nowrap items-center mt-6">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
                <i className={`fa-${article.saved.includes('13445466') ? "solid" : "regular"} fa-bookmark cursor-pointer`} onClick={updateSave}></i> | 
                <i className="fa-solid fa-thumbs-up cursor-pointer" onClick={updateLike}></i>
                <div className="flex flex-col">
                    <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                    {article.likes.length}
                    </h4>
                </div>
            </div>
            <Link to={`/articledetail/${article._id}`} className="font-bold text-dark-light italic text-sm md:text-base">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
