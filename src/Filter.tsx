import React from 'react';
import { filterActions } from './store/filter/filterSlice';
import { useStateSelector, useAppDispatch } from './store/hooks';

export default function Filter() {
  const { title, body } = useStateSelector((state) => state.filters);

  const posts = useStateSelector((state) => state.posts.posts);
  const filterTitleValue = useStateSelector((state) => state.filters.title);
  const filterBodyValue = useStateSelector((state) => state.filters.body);

  const dispatch = useAppDispatch();

  function filteredPostsByTitle() {
    const loverCaseFilter = filterTitleValue.toLowerCase();

    if (!loverCaseFilter) {
      return posts;
    }
    return posts.filter((post) => post.title.toLowerCase().includes(loverCaseFilter));
  }

  function filteredPostsByBody() {
    const loverCaseFilter = filterBodyValue.toLowerCase();

    if (!loverCaseFilter) {
      return posts;
    }
    return posts.filter((post) => post.body.toLowerCase().includes(loverCaseFilter));
  }

  return (
    <div>
      <input
        onKeyUp={filteredPostsByTitle}
        type="search"
        placeholder="сортировать по title"
        value={title}
        onChange={(e) => dispatch(filterActions.setTitle(e.target.value))}
      />
      <input
        onKeyUp={filteredPostsByBody}
        type="search"
        placeholder="сортировать по body"
        value={body}
        onChange={(e) => dispatch(filterActions.setBody(e.target.value))}
      />
    </div>
  );
}
