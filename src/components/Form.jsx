import React from "react";

const Form = () => {
  return (
    <form
      action="http://localhost:9000/signup"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="file" name="image" />
      <input type="text" name="name"  placeholder="Your Name"/>
      <input type="submit" name="avatar" value="Upload Now" />
    </form>
  );
};

export default Form;
