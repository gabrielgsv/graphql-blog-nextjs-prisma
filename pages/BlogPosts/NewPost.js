import React from "react";
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client'
import { ADD_BLOGPOST } from "../../services/queries";

const NewPost = ({ text, setText }) => {
  const [addBlogPost] = useMutation(ADD_BLOGPOST, {
    onCompleted: (data) => {
      window.location.reload();
    },
  });

  function handleSubmit() {
    if (text)
      addBlogPost({ variables: { text } });
  }
  return (
    <form onSubmit={() => handleSubmit()}>
      <FormControl width={400}>
        <FormLabel>Novo Post</FormLabel>
        <Input
          id="newPost"
          type="text"
          placeholder="Novo Post"
          value={text}
          onChange={(e) => setText(e?.target?.value)}
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} type="submit">
        Adicionar
      </Button>
    </form>
  );
};

export default NewPost;
