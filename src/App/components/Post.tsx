import React from "react";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { useAppDispatch } from "../../store/hooks";
import { Link } from "react-router-dom";

export default function Post({ id, title, body, userId }: IPost) {
  const dispatch = useAppDispatch();
  return (
    <div className="boxForPosts">
      <div className="post">
        <textarea
          className="textarea"
          value={title}
          defaultValue={title}
          disabled
        />
        <textarea
          className="textarea1"
          value={body}
          defaultValue={body}
          disabled
        />
        <button
          onClick={() =>
            id !== undefined && dispatch(postsActions.reqRemovePosts(id))
          }
          className="waves-effect waves-light btn-small  red darken-1"
        >
          <i className="material-icons right">delete</i>delete
        </button>{" "}
        <Link
          to={`/posts/${id}`}
          className="waves-effect waves-light btn-small orange accent-2"
        >
          <i className="material-icons right">border_color</i>edit
        </Link>
      </div>
    </div>
  );
}
