import axios from "axios";

export const useHttp = () => {
    const client = axios.create({
        baseURL: import.meta.env.VUE_APP_API_URL || 'http://localhost:8000',
        headers: {
            "Content-Type": "application/json",
            "X-requested-with": "XMLHttpRequest",
        },
    });

    const get = (url, params) => client.get(url, {params}); 
    const post = (url, params, data) => client.post(url, data, {params}); 
    const put = (url, data, params) => client.put(url, data, {params}); 
    const patch = (url, data, params) => client.patch(url, data, {params}); 
    const destroy = (url, params) => client.delete(url, {params}); 

    return {
        get,
        post,
        put,
        patch,
        destroy
    }
}