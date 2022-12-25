import { Gift } from "../types/types"

export const api = {
    list: ():Promise<Gift[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = JSON.parse(localStorage.getItem('gifts') as string) || []
                return resolve(response)
            },1200)
        })
    }
}