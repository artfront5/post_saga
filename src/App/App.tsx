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
import { CreationBar } from "./components/common/CreationBar";

export function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Outlet />}>
            <Route index element={<Posts />} />
            <Route path=":postId" element={<CreationBar />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
