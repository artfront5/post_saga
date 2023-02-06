import React from "react";
import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { getFilterPosts, getPosts } from "../../store/posts/post.selectors";
import { postsActions } from "../../store/posts/postsSlice";
import { usersActions } from "../../store/users/usersSlice";
import Post from "./Post";
import Filter from "./Filter";

function Posts() {
  const [details, setDetails] = React.useState<boolean | string>("false");

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
    dispatch(postsActions.getPosts());
    dispatch(usersActions.getUsers());
  }, [dispatch]);

  function handlerShowPosts() {
    setDetails((prev) => !prev);
  }
  return (
    <div>
      <a className="btn-floating btn-large waves-effect waves-light green mb">
        <i className="material-icons">add</i>
      </a>
      <Filter />
      {filteredPosts.map((post) => {
        return <Post {...post} />;
      })}
    </div>
  );
}

export default Posts;
