import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "./api/axios";
// import { Link } from "react-router-dom";
import { useState } from "react";
import CommentCard from "./CommentCard";

export default function CommentDetail() {
  const [comment, setComment] = useState({});
  const [commentList, setCommentList] = useState([]);
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    axios
      .post(
        "comment/getcommentdata",
        { commentId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setComment(res.data.comment);
        setCommentList(res.data.commentList);
      })
      .catch((err) => {
        alert(err);
      });
  }, [id]);

  const allComments = commentList.map((obj, index) => {
    console.log(obj, index);
    return <CommentCard comment={obj} key={obj._id} />
  })

  const createComment = async () => {
    try {
      console.log(id);
      const res = await axios.post(
        "/comment/create",
        {
          parent: id,
          content: commentContent,
          userName: "Nirav Kamani",
          email: "20bce116@nirmauni.ac.in",
          imageUrl:
            "https://avatarfiles.alphacoders.com/322/thumb-150-322448.jpg",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(res);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container">
      <CommentCard comment={comment} key={comment._id} />

      <div
        className={`rounded-xl mx-[10%] mt-20 overflow-hidden bg-white mb-5 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]`}
      >
        <div class="p-6 items-center mx-[10%]">
        <textarea
          className="border block p-3 m-3 w-[100%] shadow"
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
        <a
          href="#"
          class="block mx-auto w-[30%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
          onClick={createComment}
        >
          comment
        </a>
      </div>
      {allComments}
      </div>
    </div>
  );
}
