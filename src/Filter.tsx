import React from 'react';

import { useStateSelector, useAppDispatch } from './store/hooks';
import { postsActions } from './store/posts/postsSlice';

const Filter = () => {
  const { title, body } = useStateSelector((state) => state.posts.filter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="сортировать по title"
        value={title}
        onChange={(e) => dispatch(postsActions.setTitle(e.target.value))}
      />
      <input
        type="text"
        placeholder="сортировать по body"
        value={body}
        onChange={(e) => dispatch(postsActions.setBody(e.target.value))}
      />
    </div>
  );
};

export default Filter;
