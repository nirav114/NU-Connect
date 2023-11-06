import Login from './components/Login'
import Home from './components/Home';
import Register from './components/Register';
import Navbar from './components/Navbar'
import Articles from './components/Articles';
// import Posts from './components/Posts';
import Createarticle from './components/Createarticle'
import ArticleDetail from './components/ArticleDetail'
import CommentDetail from './components/CommentDetail';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './components/Profile';

function App() {
  return (
    <> 
        <Router>
              <Navbar/>
              <div className="container">
                <Routes>
                  <Route exact path="/" key="home" element={<Home/>} />
                  <Route exact path="/login" key="login" element={<Login/>} />
                  <Route exact path="/Register" key="register" element={<Register/>} />
                  <Route exact path="/articles" key="articles" element={<Articles/>} />
                  {/* <Route exact path="/posts" key="articles" element={<Posts/>} /> */}
                  <Route exact path="/createarticle" key="createarticle" element={<Createarticle/>} />
                  <Route exact path="/articledetail/:id" key="articledetail" element={<ArticleDetail/>} />
                  <Route exact path="/commentdetail/:id" key="commentdetail" element={<CommentDetail/>} />
                  <Route exact path="/profile/:id" key="profile" element={<Profile/>} />
                </Routes>
              </div>
        </Router>
    </>
  );
}

export default App;