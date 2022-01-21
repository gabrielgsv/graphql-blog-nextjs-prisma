import { gql } from "apollo-server-micro";

const typeDefsBlogPosts = gql`
  type BlogPost {
    id: String
    text: String
  }

  type Query {
    blogPosts: [BlogPost]
  }

  type Mutation {
    addBlogPost(text: String): BlogPost
    editBlogPost(id: String, text: String): BlogPost
    deleteBlogPost(id: String): BlogPost
  }
`;

export default typeDefsBlogPosts;