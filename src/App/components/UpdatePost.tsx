import React from "react";
import { Form } from "react-router-dom";
import { IPost } from "../../store/posts/postsSlice";

function UpdatePost({ id, title, body, userId }: IPost) {
  return (
    <Form method="post" action={`/posts/${id}/edit`}>
      <label>
        Title:
        <input type="text" name="title" defaultValue={title} />
      </label>
      <label>
        Body:
        <input type="text" name="body" defaultValue={body} />
      </label>
      <input type="hidden" name="userId" value={userId} />
      <input type="hidden" name="id" value={id} />
    </Form>
  );
}

export default UpdatePost;
