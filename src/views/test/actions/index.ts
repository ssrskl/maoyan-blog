import useSWR from "swr";
import {fetchTestData} from "@/apis/test";

export function useTest(){
    const {data, error,isLoading} = useSWR("/about",fetchTestData);
    return {data,error,isLoading}
}