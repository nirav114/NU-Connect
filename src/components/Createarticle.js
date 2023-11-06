import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "./api/axios";

export default function Createarticle() {
  
    // function checkIfImageExists(url) {
    
    //   const img = new Image();
    //   img.src = url;
    
    //   if (img.complete) {
    //     return true;
    //   } else {
    //     img.onload = () => {
    //       console.log(true)
    //       return true;
    //     };
        
    //     img.onerror = () => {
    //       console.log(false)
    //       return false;
    //     };
    //   }
    // }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [author, setAuthor] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  

  const storeArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/article/create', 
          {
            title,
            content,
            userName : 'nirav114',
            email : 'nifionfnf',
            cover : 'kissmypiss.jpg',
            imageUrl
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            }
          }
        );
      console.log(response);
    } catch(err) {
      console.log("error : ", err);
    }
  }

  return (
    <div className="container mt-20 lg:w-[75%]">
      <form action="">
        <input
          type="text"
          className="form-control mb-8 h-[50px]"
          placeholder="Enter title here"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          className="form-control mb-8 h-[50px]"
          placeholder="Enter cover image link"
          name="cover"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Editor
          textareaName="content"
          initialValue="Enter content here"
          required
          onEditorChange={(newtext) => {
            setContent(newtext);
          }}
          init={{
            width: "100%",
            height: 300,
            plugins: [
              "advlist",
              "autolink",
              "link",
              "image",
              "lists",
              "charmap",
              "prewiew",
              "anchor",
              "pagebreak",
              "searchreplace",
              "wordcount",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "emoticons",
              "template",
              "codesample",
            ],
            toolbar:
              "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
              "bullist numlist outdent indent | link image | print preview media fullscreen | " +
              "forecolor backcolor emoticons",
            menu: {
              favs: {
                title: "Menu",
                items: "code visualaid | searchreplace | emoticons",
              },
            },
            menubar: "favs file edit view insert format tools table",
            content_style:
              "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
          }}
        />
          <button className="mt-8 bg-blue-500 mx-auto d-grid hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={storeArticle}>
            Create
          </button>
      </form>
    </div>
  );
}