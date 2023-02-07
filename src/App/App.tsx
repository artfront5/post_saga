import React from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Posts from "./components/Posts";
import "./App.css";
import Home from "./components/Home";
import EditPost from "./components/EditPost";
import NewPost from "./components/NewPost";

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
            <Route path=":id/new" element={<NewPost />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
