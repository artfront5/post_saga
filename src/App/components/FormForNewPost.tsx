import React from 'react';
import { useAppDispatch, useStateSelector } from '../../store/hooks';
import { IPost, postsActions } from '../../store/posts/postsSlice';
import { getCurrentElement } from '../../store/posts/post.selectors';

export function FormForNewPost() {
  const dispatch = useAppDispatch();
  const post = useStateSelector(getCurrentElement);

  // функция setValue c аргументами какого-либо ключа объекта IPost
  const setValue = (fieldName: 'title' | 'body') => {
    // T дженерик сложный, который наследует любой из типов значений в объекте IPost по его ключам (string, number или undefined)
    return <T extends IPost[keyof IPost]>(value: T) => {
      dispatch(postsActions.setCurrentElement({ ...post, [fieldName]: value }));
    };
  };

  function handlerAddPost() {
    dispatch(
      postsActions.reqAddPost({
        title: post.title,
        body: post.body,
        userId: 1,
      })
    );
  }

  return (
    <div className="addPostBox">
      <button className="buttonPostHidden" onClick={handlerAddPost}>
        новый пост
      </button>
      <input
        value={post.title}
        onChange={(e) => setValue('title')(e.target.value)}
        placeholder="title"
      />
      <input
        value={post.body}
        onChange={(e) => setValue('body')(e.target.value)}
        placeholder="body"
      />
    </div>
  );
}
