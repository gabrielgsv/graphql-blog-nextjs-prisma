import { useQuery, useMutation } from '@apollo/client'
import { Flex } from '@chakra-ui/react';
import Image from "next/image"
import { useEffect, useState } from 'react';

import { GET_BLOGPOSTS, DELETE_BLOGPOST } from "./queries"
import NewPost from "./NewPost";
import ListPosts from "./ListPosts";
import image from "../../images/next-graphql-apollo.jpg"

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
      <Flex width={"100vw"} alignItems={"center"} marginTop="-60px" flexDirection={"column"}>
        <Image
          src={image}
          alt="Next Graphql and Apollo"
          width={600}
          height={350}
          quality={100}
        />
        <NewPost text={text} setText={setText} />
        <ListPosts posts={posts} setPosts={setPosts} />
      </Flex>
    </>
  );
};

export default BlogPosts;