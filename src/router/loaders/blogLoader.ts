// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { databases } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";

export const blogLoader = async () => {
  const data = {};
  try {
    data.blogs = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "674ea93300318c2482e7"
    );
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Error while fetching blogs:", error.message);
    }
  }
  return data;
};
