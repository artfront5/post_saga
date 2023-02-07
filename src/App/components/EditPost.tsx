import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateSelector, useAppDispatch } from '../../store/hooks';
import { postsActions, IPost } from '../../store/posts/postsSlice';
import { getUsers } from '../../store/users/user.selectors';
import UpdatePost from './UpdatePost';
import { useNavigate } from 'react-router-dom';

function EditPost() {
  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useStateSelector((state) =>
    state.posts.posts.find((el) => el.id === +postId!)
  );

  const [title, setSaveTitle] = React.useState(post?.title || '');
  const [body, setSaveBody] = React.useState(post?.body || '');

  const dispatch = useAppDispatch();

  if (!post) {
    return <p>No post</p>;
  }

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title,
        body,
        userId: post!.userId,
        id: post!.id,
      })
    );

    // navigate('/posts');
  }

  return (
    <div className="addPostBox">
      <input
        className="inputNew"
        type="text"
        placeholder="сортировать по title"
        value={title}
        onChange={(e) => setSaveTitle(e.target.value)}
      />
      <input
        type="text"
        className="inputNew"
        placeholder="сортировать по body"
        value={body}
        onChange={(e) => setSaveBody(e.target.value)}
      />
      <button onClick={savePost}>Save</button>
    </div>
  );
}

export default EditPost;
