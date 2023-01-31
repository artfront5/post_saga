import React, { useEffect } from "react";
import { useAppDispatch, useStateSelector } from "./store/hooks";
import cn from "classnames";
import { postsActions } from "./store/posts/postsSlice";
import Form from "./Form";

import "./App.css";

function App() {
  const [details, setDetails] = React.useState<boolean | string>("false");

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
          className={cn("buttonGetPost", { buttonPostHidden: details })}
          onClick={handlerShowPosts}
        >
          {details ? "Показать посты" : "Скрыть посты"}
        </button>

        <Form />
      </div>
      {details
        ? null
        : posts.map(({ id, title, body, userId }) => {
            return (
              <div key={id} className="post">
                <h3>{title}</h3>
                <p>{body}</p>
                <button
                  onClick={() =>
                    id !== undefined &&
                    dispatch(postsActions.reqRemovePosts({ id }))
                  }
                >
                  Удалить
                </button>{" "}
                <button
                  onClick={() =>
                    dispatch(
                      postsActions.reqReplacePosts({
                        title,
                        body,
                        userId: 1,
                      })
                    )
                  }
                >
                  Редактировать
                </button>
              </div>
            );
          })}
    </div>
  );
}

export default App;
