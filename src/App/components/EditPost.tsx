import React from "react";
import { useParams } from "react-router-dom";
import { useStateSelector, useAppDispatch } from "../../store/hooks";
import { postsActions, IPost } from "../../store/posts/postsSlice";
import { getUsers } from "../../store/users/user.selectors";
import UpdatePost from "./UpdatePost";

function EditPost({ id, title, body, userId }: IPost) {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLInputElement>(null);

  const users = useStateSelector(getUsers);

  const postAuthor = React.useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users]);

  const [isEditMode, setIsEditMode] = React.useState(false);
  const dispatch = useAppDispatch();

  function savePost() {
    dispatch(
      postsActions.reqEditPost({
        title: titleRef.current!.value,
        body: bodyRef.current!.value,
        userId,
        id,
      })
    );

    setIsEditMode(false);
  }

  return (
    <div>
      <UpdatePost />
    </div>
  );
}

export default EditPost;
