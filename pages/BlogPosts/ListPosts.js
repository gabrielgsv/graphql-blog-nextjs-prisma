import React from "react";
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useMutation } from "@apollo/client"

import { DELETE_BLOGPOST, EDIT_BLOGPOST } from "./queries"

const ListPosts = ({ posts, setPosts }) => {
  const [deleteBlogPost] = useMutation(DELETE_BLOGPOST, {
    onCompleted: () => {
      window.location.reload()
    }
  })

  const [editBlogPost] = useMutation(EDIT_BLOGPOST, {
    onCompleted: () => {
      window.location.reload()
    }
  })

  const onDelete = (id) => deleteBlogPost({ variables: { id } })
  const onEdit = (id, text) => editBlogPost({ variables: { id, text } })
  const handleChange = (text, index) => {
    const newPosts = [...posts];
    newPosts[index] = { ...newPosts[index], text };
    setPosts(newPosts);
  }

  return (
    <>
      {posts?.map((post, index) => (
        <Flex bg="whitesmoke" key={post?.id} padding={5} width={400} marginY={2} borderRadius={8} flexDirection={"column"}>
          <form onSubmit={() => onEdit(post?.id, post?.text)}>
            <Input
              id="post-text"
              type="text"
              value={post?.text}
              onChange={(e) => handleChange(e.target.value, index)}
            />
            <Box alignSelf="end" marginTop={3}>
              <Button
                colorScheme="teal"
                marginX={3}
                type="submit"
              >
                Editar
              </Button>

              <Button
                colorScheme="red"
                onClick={() => onDelete(post?.id)}
              >
                Excluir
              </Button>
            </Box>
          </form>
        </Flex>
      ))}
    </>
  );
};

export default ListPosts;
