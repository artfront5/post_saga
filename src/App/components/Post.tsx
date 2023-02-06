import React, { useCallback, useMemo, useRef, useState } from "react";
import { IPost, postsActions } from "../../store/posts/postsSlice";
import { useAppDispatch, useStateSelector } from "../../store/hooks";
import { getUsers } from "../../store/users/user.selectors";
import { Link } from "react-router-dom";

export default function Post({ id, title, body, userId }: IPost) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  // const [count, setCount] = useState(1);

  const users = useStateSelector(getUsers);

  const postAuthor = useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users]);

  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useAppDispatch();

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title: titleRef.current!.value,
        body: bodyRef.current!.value,
        userId,
        id,
      })
    );

    setIsEditMode(false);
  }

  return (
    <div className="boxForPosts">
      <div className="post">
        {/* {postAuthor && (
          <div>
            <p>{postAuthor.name}</p> <p>{postAuthor.id}</p>
          </div>
        )} */}
        <input
          className="textarea"
          ref={titleRef}
          defaultValue={title}
          disabled={!isEditMode}
        />
        <input
          className="textarea"
          ref={bodyRef}
          defaultValue={body}
          disabled={!isEditMode}
        />
        <button
          onClick={() =>
            id !== undefined && dispatch(postsActions.reqRemovePosts(id))
          }
        >
          Удалить
        </button>{" "}
        {isEditMode ? (
          <button onClick={savePost}>save</button>
        ) : (
          <Link to={`/posts/${id}/edit`} onClick={() => setIsEditMode(true)}>
            Редактировать
          </Link>
        )}
      </div>
    </div>
  );
}
