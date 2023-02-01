import React, { useRef, useState } from 'react';
import { IPost, postsActions } from './store/posts/postsSlice';
import { useAppDispatch, useStateSelector } from './store/hooks';

export default function Post({ id, title, body, userId }: IPost) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useAppDispatch();

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title: titleRef.current!.value,
        body: bodyRef.current!.value,
        userId: 1,
        id,
      })
    );
    setIsEditMode(false);
  }

  return (
    <div>
      <div key={id} className="post">
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
          onClick={() =>
            id !== undefined && dispatch(postsActions.reqRemovePosts({ id }))
          }
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
