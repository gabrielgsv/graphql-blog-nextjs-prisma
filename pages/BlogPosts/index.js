import { useQuery, useMutation } from '@apollo/client'
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { GET_BLOGPOSTS, DELETE_BLOGPOST } from "./queries"
import NewPost from "./NewPost";
import ListPosts from "./ListPosts";

const BlogPosts = () => {
  const { loading, error, data } = useQuery(GET_BLOGPOSTS)
  const [posts, setPosts] = useState([])
  const [text, setText] = useState("")


  useEffect(() => {
    setPosts(data?.blogPosts)
  }, [data])

  if (loading) {
    return "Loading..."
  }

  if (error) {
    return "Error..."
  }

  return (
    <>
      <Flex width={"100vw"} alignItems={"center"} marginTop={20} flexDirection={"column"}>
        <NewPost text={text} setText={setText} />
        <ListPosts posts={posts} setPosts={setPosts} />
      </Flex>
    </>
  );
};

export default BlogPosts;