import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper blue-grey px1 ">
        <a href="*" className="brand-logo">
          Posts
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/posts">Посты</Link>
          </li>
          <li>
            <Link to="/newPost">Новый пост</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
