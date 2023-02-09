import React from "react";
import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { getFilterPosts, getPosts } from "../../store/posts/post.selectors";
import { postsActions } from "../../store/posts/postsSlice";
import { usersActions } from "../../store/users/usersSlice";
import Post from "./Post";
import Filter from "./Filter";
import { Link } from "react-router-dom";

function Posts() {
  const posts = useStateSelector(getPosts);
  const { title, body } = useStateSelector(getFilterPosts);

  const filteredPosts = React.useMemo(() => {
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

  React.useEffect(() => {
    if (posts.length === 0) {
      dispatch(postsActions.getPosts());
      dispatch(usersActions.getUsers());
    }
  }, [dispatch]);

  return (
    <div>
      <Link
        to={`/posts/${-1}`}
        className="btn-floating btn-large waves-effect waves-light green mb"
      >
        <i className="material-icons">add</i>
      </Link>
      <Filter />
      {filteredPosts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </div>
  );
}

export default Posts;
