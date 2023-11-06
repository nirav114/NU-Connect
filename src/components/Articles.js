import React, { useEffect, useState } from "react";
import Article from "./Article";
import axios from "./api/axios";

export default function Articles() {

  var sample = []
  const [allArticles, setAllArticles] = useState(sample);
  const [filterPost, setFilterPost] = useState(sample);
  const [post, setPost] = useState(sample);
  const [sortBy, setSortBy] = useState("");
  const userId = "13445466";
  
  useEffect(() => {
    const getAllData = () => {
      axios.get('/article/getallarticles')
        .then((res)=>{
          console.log(res)
          setAllArticles(res.data)
          setPost(res.data)
          setFilterPost(res.data)
        })
        .catch((err)=>{
          console.log("error : ", err)
        })
      // setAllArticles(res.data);
      // setPost(res.data)
      // setFilterPost(res.data)
    }
    getAllData();
  }, [])

  const cmpDate = (obj1, obj2) => {
    return obj1.createdAt - obj2.createdAt;
  }
  const sortByDate = () => {
    sample = [...filterPost];
    sample.sort(cmpDate);
    setPost(sample);
  }

  const cmpLike = (obj1, obj2) => {
    return obj2.likes.length - obj1.likes.length;
  }
  const sortByLike = () => {
    sample = [...filterPost];
    sample.sort(cmpLike);
    setPost(sample) 
  }

  const cmpPopularity = (obj1, obj2) => {
    return obj1.createdAt - obj2.createdAt;
  }
  const sortByPopularity = () => {
    sample = [...filterPost];
    sample.sort(cmpPopularity);
    setPost(sample);
  }

  const handleYourArticle = () => {
    sample = allArticles.filter((obj) => {
      return obj.email = userId;
    });
    setFilterPost(sample);
    setPost(sample);
    setSortBy("");
  } 

  const handleSavedArticle = () => {
    sample = allArticles.filter((obj) => {
      return obj.saved.includes(userId);
    });
    setFilterPost(sample);
    setPost(sample);
    setSortBy("");
  };

  const handleAllArticle = () => {
    setPost(allArticles);
    setFilterPost(allArticles);
    setSortBy("");
  }

  const articles = post.map((post, index) => {
    return <Article post={post} key={post._id} />
  })
  
  return (
    <>
      <div className="container mx-auto px-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:mx-60 gap-12 flex justify-between">
          <div className="lg:col-span-7 col-span-1">
            {
              articles
            }
          </div>
          <div className="lg:col-span-3 col-span-1">
            <div className="lg:sticky relative top-20">
              
              <div className="bg-white shadow-lg rounded-lg p-8 pb-10 mb-8">
                <h3 className="text-xl mb-2 font-semibold border-b pb-2">
                  Sort By
                </h3>
                <div className="flex items-center w-full">
                  <div className="flex-grow">
                    <label><input className="me-2" value="date" type="radio" checked={sortBy === "date"} onChange={(e) => setSortBy(e.target.value)}  onClick={sortByDate}/>date</label><br/>
                    <label><input className="me-2" value="likes" type="radio" checked={sortBy === "likes"} onChange={(e) => setSortBy(e.target.value)}  onClick={sortByLike} />likes</label><br/>
                    <label><input className="me-2" value="pop" type="radio" checked={sortBy === "pop"} onChange={(e) => setSortBy(e.target.value)}  onClick={sortByPopularity} />popularity</label>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-8 pb-10 mb-8">
                <h3 className="text-xl mb-2 font-semibold border-b pb-2">
                  Checkout
                </h3>
                <div className="flex items-center w-full">
                  <div className="flex-grow">
                  <label><input className="me-2" type="radio" name="art" value="1" onClick={handleAllArticle} />all articles</label><br/>
                    <label><input className="me-2" type="radio" name="art" value="1" onClick={handleYourArticle} />your articles</label><br/>
                    <label><input className="me-2" type="radio" name="art" value="1" onClick={handleSavedArticle} />saved articles</label><br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
