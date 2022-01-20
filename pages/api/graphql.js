import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";

const prisma = new PrismaClient();

const typeDefs = gql`
  type BlogPost {
    id: String
    text: String
  }

  type Query {
    blogPosts: [BlogPost]
  }

  type Mutation {
    addBlogPost(text: String!): BlogPost
    editBlogPost(id: String!, text: String!): BlogPost
    deleteBlogPost(id: String!): BlogPost
  }
`;
const resolvers = {
  Query: {
    blogPosts: (_parents, _args, _context) => {
      return prisma.blogPost.findMany();
    },
  },

  Mutation: {
    addBlogPost: (_parents, args, _context) => {
      return prisma.blogPost.create({
        data: { text: args.text }
      });
    },
    editBlogPost: (_parents, args, _context) => {
      return prisma.blogPost.update({
        where: { id: args.id },
        data: { text: args.text }
      });
    },
    deleteBlogPost: (_parents, args, _context) => {
      return prisma.blogPost.delete({
        where: { id: args.id }
      });
    }
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = { api: { bodyParser: false } };

export default handler;
