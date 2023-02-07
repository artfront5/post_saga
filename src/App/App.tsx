// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useMemo } from "react";
// import { useAppDispatch, useStateSelector } from "../store/hooks";
// import cn from "classnames";
// import { postsActions } from "../store/posts/postsSlice";
// import Post from "./components/Post";

// import "./App.css";
// import Filter from "./components/Filter";
// import { Navbar } from "./components/Navbar";
// import { usersActions } from "../store/users/usersSlice";
// import { getFilterPosts, getPosts } from "../store/posts/post.selectors";
// import { FormForNewPost } from "./components/FormForNewPost";

// function App() {
//   const [details, setDetails] = React.useState<boolean | string>("false");

//   const posts = useStateSelector(getPosts);

//   const { title, body } = useStateSelector(getFilterPosts);

//   const filteredPosts = useMemo(() => {
//     const lowerCaseFilterTitle = title.toLowerCase();
//     const lowerCaseFilterBody = body.toLowerCase();

//     if (!lowerCaseFilterTitle && !lowerCaseFilterBody) {
//       return posts;
//     }

//     return posts.filter((post) => {
//       if (lowerCaseFilterTitle) {
//         if (!post.title.toLowerCase().includes(lowerCaseFilterTitle)) {
//           return false;
//         }
//       }

//       if (lowerCaseFilterBody) {
//         if (!post.body.toLowerCase().includes(lowerCaseFilterBody)) {
//           return false;
//         }
//       }

//       return true;
//     });
//   }, [posts, title, body]);

//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(postsActions.getPosts());
//     dispatch(usersActions.getUsers());
//   }, [dispatch]);

//   function handlerShowPosts() {
//     setDetails((prev) => !prev);
//   }

//   return (
//     <div className="App">
//       <Navbar />
//       <div className="buttonsBox">
//         {/* <button
//           className={cn("buttonGetPost", { buttonPostHidden: details })}
//           onClick={handlerShowPosts}
//         > */}
//         {/* {details ? "Показать посты" : "Скрыть посты"} */}
//         {/* </button> */}

//         <Filter />
//       </div>
//       {filteredPosts.map((post) => {
//         return <Post {...post} />;
//       })}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FormForNewPost } from './components/FormForNewPost';
import Posts from './components/Posts';
import './App.css';
import Home from './components/Home';
import EditPost from './components/EditPost';

export function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Outlet />}>
            <Route index element={<Posts />} />
            <Route path=":postId/edit" element={<EditPost />} />
          </Route>

          <Route path="/newPost" element={<FormForNewPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
