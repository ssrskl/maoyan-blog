import request from "@/lib/request.ts";

export const fetchTestData = ()=>{
    return request({
        url: "/about",
        method: "GET"
    })
}