// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { databases } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

export const blogDetailLoader = async ({ params }) => {
  const blogId = params.id;
  const data = {};
  try {
    data.blog = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "674ea93300318c2482e7",
      blogId
    );
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Error while fetching blogs:", error.message);
    }
  }
  return data;
};
