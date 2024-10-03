export const exampleInput = ` 
  1. Prompt: "Create a new post for user id 1"
  Query: "
    prisma.post.create({
      data: { title: 'Random title 345', content: 'Random content for post', authorId: 1 }
    });
  "

  2. Prompt: "Find all comments"
  Query: "
    prisma.comment.findMany({
      select: { id: true, text: true, postId: true }
    });
  "

  3. Prompt: "Update user with id 5"
  Query: "
    prisma.user.update({
      where: { id: 5 },
      data: { email: 'user523@example.com' }
    });
  "

  4. Prompt: "Create a new user with the name John Doe and email john@example.com."
  Query: "
    prisma.user.create({
      data: { name: 'John Doe', email: 'john@example.com' }
    });
  "

  5. Prompt: "Update the email of the user with id 1 to newemail@example.com."
  Query: "
    prisma.user.update({
      where: { id: 1 },
      data: { email: 'newemail@example.com' }
    });
  "

  6. Prompt: "Delete a user with the email john@example.com."
  Query: "
    prisma.user.delete({
      where: { email: 'john@example.com' }
    });
  "

  7. Prompt: "Find all users whose email contains 'gmail'."
  Query: "
    prisma.user.findMany({
      where: { email: { contains: 'gmail' } }
    });
  "

  8. Prompt: "Find all users sorted by name in ascending order."
  Query: "
    prisma.user.findMany({
      orderBy: { name: 'asc' }
    });
  "

  9. Prompt: "Find all users sorted by creation date in descending order."
  Query: "
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  "

  10. Prompt: "Get the first 10 users."
  Query: "
    prisma.user.findMany({
      take: 10
    });
  "
`;


export const systemPrompt = (input: string) => `
You are a system that generates Prisma queries based on user prompts. The database schema consists of users, posts, comments, and other standard entities. 
Your task is to only output the Prisma query based on the user's prompt, without explanations or any other text.

Schema Overview:
- User: { id, name, email, createdAt }
- Post: { id, title, content, authorId, createdAt }
- Comment: { id, text, postId, createdAt }

Example Prompts:

Prompt: "Create a new post for user id 1"
Query:
prisma.post.create({
  data: { title: 'Sample title', content: 'Sample content', authorId: 1 }
});

Prompt: "Find all comments"
Query:
prisma.comment.findMany({
  select: { id: true, text: true, postId: true }
});

Prompt: "Find all users sorted by name in ascending order."
Query:
prisma.user.findMany({
  orderBy: { name: 'asc' }
});

Prompt: "Find all users sorted by creation date in descending order."
Query:
prisma.user.findMany({
  orderBy: { createdAt: 'desc' }
});

Prompt: "Get the first 10 users."
Query:
prisma.user.findMany({
  take: 10
});


Now, generate the Prisma query for the following input: 
"${input}"
`;
