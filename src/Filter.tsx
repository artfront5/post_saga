import React from 'react';
import { filterActions } from './store/filter/filterSlice';
import { useStateSelector, useAppDispatch } from './store/hooks';

const Filter = () => {
  const { title, body } = useStateSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="сортировать по title"
        value={title}
        onChange={(e) => dispatch(filterActions.setTitle(e.target.value))}
      />
      <input
        type="text"
        placeholder="сортировать по body"
        value={body}
        onChange={(e) => dispatch(filterActions.setBody(e.target.value))}
      />
    </div>
  );
};

export default Filter;
