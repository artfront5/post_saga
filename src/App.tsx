import React, { useEffect } from 'react';
import { useAppDispatch, useStateSelector } from './store/hooks';
import cn from 'classnames';
import { postsActions } from './store/posts/postsSlice';
import Form from './Form';
import Post from './Post';

import './App.css';

function App() {
  const [details, setDetails] = React.useState<boolean | string>('false');

  const posts = useStateSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsActions.getPosts());
  }, [dispatch]);

  function handlerShowPosts() {
    setDetails((prev) => !prev);
  }

  return (
    <div className="App">
      Работа с ассинхронными действиями в связке Redux-Toolkit with Redux-Saga
      <h2>Посты</h2>
      <div className="buttonsBox">
        <button
          className={cn('buttonGetPost', { buttonPostHidden: details })}
          onClick={handlerShowPosts}
        >
          {details ? 'Показать посты' : 'Скрыть посты'}
        </button>

        <Form />
      </div>
      {details
        ? null
        : posts.map((post) => {
            return <Post {...post} />;
          })}
    </div>
  );
}

export default App;
