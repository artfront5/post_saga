import React from "react";
// import { useParams } from "react-router-dom";
// import { useStateSelector, useAppDispatch } from "../../store/hooks";
// import { postsActions } from "../../store/posts/postsSlice";
// import { useNavigate } from "react-router-dom";
// import { getRequestStatus } from "../../store/posts/post.selectors";
// import { InputField } from "./common/InputField";
import { CreationBar } from "./common/CreationBar";

function EditPost() {
  // const navigate = useNavigate();

  // const { postId } = useParams();
  // const status = useStateSelector(getRequestStatus);
  // const post = useStateSelector((state) =>
  //   state.posts.posts.find((el) => el.id === +postId!)
  // );

  // const [title, setSaveTitle] = React.useState(post?.title || "");
  // const [body, setSaveBody] = React.useState(post?.body || "");

  // const dispatch = useAppDispatch();

  // function savePost() {
  //   dispatch(
  //     postsActions.reqEditPost({
  //       title,
  //       body,
  //       userId: post!.userId,
  //       id: post!.id,
  //     })
  //   );
  // }

  // React.useEffect(() => {
  //   if (status === "succses") {
  //     navigate("/posts");
  //     dispatch(postsActions.setStatus({ status: "unsetted" }));
  //   }
  // }, [dispatch, status]);

  // if (!post) {
  //   return <p>No post</p>;
  // }

  return (
    <div className="addPostBox">
      <CreationBar />
      {/* <InputField
        inputClassName="textarea"
        value={title}
        placeholder="edit title"
        onChange={(e) => setSaveTitle(e.target.value)}
      />
      <InputField
        inputClassName="textarea1"
        value={body}
        placeholder="edit body"
        onChange={(e) => setSaveBody(e.target.value)}
      />

      <button
        onClick={savePost}
        className="waves-effect waves-light btn-small green"
      >
        <i className="material-icons right">save</i>save
      </button> */}
    </div>
  );
}

export default EditPost;
