import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolversBlogPosts = {
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

export default resolversBlogPosts;