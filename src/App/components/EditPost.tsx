import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { postsActions, IPost } from "../../store/posts/postsSlice";
import { getUsers } from "../../store/users/user.selectors";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();

  const { postId } = useParams();
  const post = useStateSelector((state) =>
    state.posts.posts.find((el) => el.id === +postId!)
  );

  const [title, setSaveTitle] = React.useState(post?.title || "");
  const [body, setSaveBody] = React.useState(post?.body || "");

  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();

  if (!post) {
    return <p>No post</p>;
  }

  if (loading) {
    return <h4>Сохранение изменений...</h4>;
  }

  function savePost() {
    setLoading(true);
    dispatch(
      postsActions.reqEditPost({
        title,
        body,
        userId: post!.userId,
        id: post!.id,
      })
    );

    setTimeout(() => {
      navigate("/posts");
      setLoading(false);
    }, 1000);
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
      <button
        onClick={savePost}
        className="waves-effect waves-light btn-small green"
      >
        <i className="material-icons right">save</i>save
      </button>
    </div>
  );
}

export default EditPost;
