import { account } from "@/lib/appwrite";
import { AppwriteException } from "appwrite";
import useSWR from "swr";

const fetchGetCurrentUser = () => {
  try {
    const user = account.get();
    return user;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.log(error.message);
    }
  }
};
export function useGetCurrentUser() {
  const { data, error, isLoading } = useSWR(
    "get-current-user",
    fetchGetCurrentUser
  );
  return { data, error, isLoading };
}
