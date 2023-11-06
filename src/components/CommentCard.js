import React, { useEffect } from 'react'
import axios from './api/axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CommentCard(cmt) {

  const [comment, setComment] = useState(cmt.comment)

  useEffect(() => {
  }, [])
  

  const updateLikeCmt = async () => {
    try {
        const response = await axios.post('/comment/updatelike',
          {
            commentId : comment._id, 
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
        setComment(response.data.comment)
    } catch(err) {
      console.log("error : ", err);
    }
  };

  return (
    <div>
        <div
        className={`rounded-xl p-5 mx-[10%] mt-20 overflow-hidden bg-white mb-5 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]`}
      >
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
                  {comment.userName}
                </h4>
              </div>
            </div>
            <span className="font-bold text-dark-light italic text-sm md:text-base">
              {new Date(comment.createdAt).getDate()}{" "}
              {new Date(comment.createdAt).toLocaleString("default", {
                month: "long",
              })}
            </span>
          </div>
          <div className='p-3'>
           {comment.content}
          </div>
          <div className="flex justify-between flex-nowrap items-center mt-6">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
                <i className="fa-solid fa-thumbs-up cursor-pointer" onClick={updateLikeCmt}></i>
                <div className="flex flex-col">
                    <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                    {comment.likes && comment.likes.length}
                    </h4>
                </div>
                <Link to={`/commentDetail/${comment._id}`}><i class="fa-solid fa-comment ms-1"></i></Link>
            </div>
          </div>
          </div>
    </div>
  )
}
