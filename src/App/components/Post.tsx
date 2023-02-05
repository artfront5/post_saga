import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IPost, postsActions } from '../../store/posts/postsSlice';
import { useAppDispatch, useStateSelector } from '../../store/hooks';
import { getUsers } from '../../store/users/user.selectors';

export default function Post({ id, title, body, userId }: IPost) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
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
    <div>
      <div key={id} className="post">
        {postAuthor && (
          <div>
            <p>{postAuthor.name}</p> <p>{postAuthor.id}</p>
          </div>
        )}
        <textarea
          className="textarea"
          ref={titleRef}
          defaultValue={title}
          disabled={!isEditMode}
        />
        <textarea
          className="textarea"
          ref={bodyRef}
          defaultValue={body}
          disabled={!isEditMode}
        />
        <button
          onClick={() => id !== undefined && dispatch(postsActions.reqRemovePosts(id))}
        >
          Удалить
        </button>{' '}
        {isEditMode ? (
          <button onClick={savePost}>save</button>
        ) : (
          <button onClick={() => setIsEditMode(true)}>Редактировать</button>
        )}
      </div>
    </div>
  );
}
