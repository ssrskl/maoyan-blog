export type ResponseResult<T> = {
    // 状态码
    code: number;
    // 提示信息
    msg: string;
    // 数据
    data: T;
}