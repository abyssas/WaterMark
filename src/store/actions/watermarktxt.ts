import request from "../../utils/request"

export const getwatermarktxt = (): any => {
    return async () => {
        const { data } = await request.get("/")
        console.log(data)
    }
}