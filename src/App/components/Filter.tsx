import React from "react";

import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { getFilterPosts } from "../../store/posts/post.selectors";
import { postsActions } from "../../store/posts/postsSlice";

const Filter = () => {
  const { title, body } = useStateSelector(getFilterPosts);
  const dispatch = useAppDispatch();

  return (
    <div className="addPostBox">
      <input
        className="inputNew"
        type="text"
        placeholder="сортировать по title"
        value={title}
        onChange={(e) => dispatch(postsActions.setTitle(e.target.value))}
      />
      <input
        type="text"
        className="inputNew"
        placeholder="сортировать по body"
        value={body}
        onChange={(e) => dispatch(postsActions.setBody(e.target.value))}
      />
    </div>
  );
};

export default Filter;
