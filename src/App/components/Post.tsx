import React, { useCallback, useMemo, useRef, useState } from "react";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { useAppDispatch, useStateSelector } from "../../store/hooks";
import { getUsers } from "../../store/users/user.selectors";
import { Link } from "react-router-dom";

export default function Post({ id, title, body, userId }: IPost) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  // const [count, setCount] = useState(1);

  const users = useStateSelector(getUsers);

  const postAuthor = useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users]);

  const dispatch = useAppDispatch();
  return (
    <div className="boxForPosts">
      <div className="post">
        <textarea
          className="textarea"
          ref={titleRef}
          defaultValue={title}
          disabled
        />
        <textarea
          className="textarea1"
          ref={bodyRef}
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
          to={`/posts/${id}/edit`}
          className="waves-effect waves-light btn-small orange accent-2"
        >
          <i className="material-icons right">border_color</i>edit
        </Link>
      </div>
    </div>
  );
}
