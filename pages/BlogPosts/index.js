import { useQuery, gql } from '@apollo/client'
import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const GET_BLOGPOSTS = gql`
  query {
    blogPosts {
      id
      text
    }
  }
`

const BlogPosts = () => {
  const { loading, error, data } = useQuery(GET_BLOGPOSTS)
  const [posts, setPosts] = useState([])

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
        <FormControl width={400}>
          <FormLabel>Novo Post</FormLabel>
          <Input id="newPost" type="text" placeholder="Novo Post" />
          <Button colorScheme="blue" mt={4}>Adicionar</Button>
        </FormControl>
        {posts?.map((post) => (
          <Box bg="whitesmoke" key={post?.id} padding={5} width={400} marginY={2} borderRadius={8}>
            <p>{post?.text}</p>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default BlogPosts;