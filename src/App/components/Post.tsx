import React, { useCallback, useMemo, useRef, useState } from 'react';
import { IPost, postsActions } from '../../store/posts/postsSlice';
import { useAppDispatch, useStateSelector } from '../../store/hooks';
import { getUsers } from '../../store/users/user.selectors';
import { Link } from 'react-router-dom';

export default function Post({ id, title, body, userId }: IPost) {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  // const [count, setCount] = useState(1);

  const users = useStateSelector(getUsers);

  const postAuthor = useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users]);

  const dispatch = useAppDispatch();
  return (
    <div className="boxForPosts">
      <div className="post">
        {/* {postAuthor && (
          <div>
            <p>{postAuthor.name}</p> <p>{postAuthor.id}</p>
          </div>
        )} */}
        <input className="textarea" ref={titleRef} defaultValue={title} />
        <input className="textarea" ref={bodyRef} defaultValue={body} />
        <button
          onClick={() => id !== undefined && dispatch(postsActions.reqRemovePosts(id))}
        >
          Удалить
        </button>{' '}
        <Link to={`/posts/${id}/edit`}>Редактировать</Link>
      </div>
    </div>
  );
}
