export type TPost = {
  id:string
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: {
      username: string;
    };
  };