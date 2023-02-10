import React from "react";

import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { getFilterPosts } from "../../store/posts/post.selectors";
import { postsActions } from "../../store/posts/postsSlice";
import { Button } from "./common/Button";
import { Icon } from "./common/Icon";

const Filter = () => {
  const { title, body } = useStateSelector(getFilterPosts);
  const dispatch = useAppDispatch();

  function handlerSearch() {
    dispatch(postsActions.getPosts());
  }

  return (
    <div className="boxForTitle">
      <input
        className="inputNew"
        type="text"
        placeholder="sort by title"
        value={title}
        onChange={(e) => {
          dispatch(postsActions.setTitle(e.target.value));
        }}
      />
      <input
        type="text"
        className="inputNew"
        placeholder="sort by body"
        value={body}
        onChange={(e) => {
          dispatch(postsActions.setBody(e.target.value));
        }}
      />
      <Button onClick={handlerSearch} buttonClassName={"btn-floating blue"}>
        {<Icon iconClassName={"material-icons right"}>{"search"}</Icon>}
      </Button>
    </div>
  );
};

export default Filter;
