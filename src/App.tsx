import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useStateSelector } from './store/hooks';
import cn from 'classnames';
import { postsActions } from './store/posts/postsSlice';
import Form from './Form';
import Post from './Post';

import './App.css';
import Filter from './Filter';
import { usersActions } from './store/users/usersSlice';
import { getFilterPosts, getPosts } from './store/posts/post.selectors';

function App() {
  const [details, setDetails] = React.useState<boolean | string>('false');

  const posts = useStateSelector(getPosts);
  // const users = useStateSelector((state) => state.users.users);
  const { title, body } = useStateSelector(getFilterPosts);

  const filteredPosts = useMemo(() => {
    const lowerCaseFilterTitle = title.toLowerCase();
    const lowerCaseFilterBody = body.toLowerCase();

    if (!lowerCaseFilterTitle && !lowerCaseFilterBody) {
      return posts;
    }

    return posts.filter((post) => {
      if (lowerCaseFilterTitle) {
        if (!post.title.toLowerCase().includes(lowerCaseFilterTitle)) {
          return false;
        }
      }

      if (lowerCaseFilterBody) {
        if (!post.body.toLowerCase().includes(lowerCaseFilterBody)) {
          return false;
        }
      }

      return true;
    });
  }, [posts, title, body]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postsActions.getPosts());
    dispatch(usersActions.getUsers());
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
        <Filter />
      </div>
      {!details &&
        filteredPosts.map((post) => {
          return <Post {...post} />;
        })}
    </div>
  );
}

export default App;
