import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from './api/axios';
import { useState } from 'react';
import CommentCard from './CommentCard';

export default function ArticleDetail() {
  const {id} = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    axios.post('/article/getarticle', 
        {articleId : id},
        {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
        }
    ).then((res) => {
        setArticle(res.data)
    }).catch((err) => {
        alert("something went wrong!");
    });

    axios.post('/comment/getComments', 
        {parent : id},
        {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
        }
    ).then((res) => {
        setComments(res.data.data)
        console.log(res.data.data)
    }).catch((err) => {
        alert("something went wrong!");
    })
  }, [])

  const updateLike = async () => {
    try {
      const response = await axios.post('/article/updatelike',
          {
            articleId : article._id, 
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
            articleId : article._id, 
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

  const createComment = async () => {
    try {
      console.log(id)
      const res = await axios.post('/comment/create', 
      {
        parent : id,
        content : commentContent,
        userName : "Nirav Kamani",
        email : "20bce116@nirmauni.ac.in",
        imageUrl : "https://avatarfiles.alphacoders.com/322/thumb-150-322448.jpg"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }
      );
      console.log(res)
    } catch(err) {
      alert(err);
    }
    setCommentContent("")
  };

  const allComments = comments.map((obj, index) => {
    console.log(obj, index);
    return <CommentCard comment={obj} key={obj._id} />
  })

  return (
      <div
        className={`rounded-xl mx-[10%] mt-20 overflow-hidden bg-white mb-5 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]`}
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
          <div dangerouslySetInnerHTML={{__html : article.content}} ></div>
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
                <i className={`fa-${article.saved && article.saved.includes('13445466') ? "solid" : "regular"} fa-bookmark cursor-pointer`} onClick={updateSave}></i> | 
                <i className="fa-solid fa-thumbs-up cursor-pointer" onClick={updateLike}></i>
                <div className="flex flex-col">
                    <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                    {article.likes && article.likes.length}
                    </h4>
                </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 items-center mx-[10%]">
            <textarea className='border block p-3 m-3 w-[100%] shadow' onChange={(e) => { setCommentContent(e.target.value)}}></textarea>
            <a href="#" class="block mx-auto w-[30%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={createComment}
            >
                comment
            </a>
        </div>
        {allComments}
        
      </div>
  )
}
