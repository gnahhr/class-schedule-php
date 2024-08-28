import axios from "axios"

const api = import.meta.env.VITE_API

const route = 'user'

export default
{
    async login(payload)
    {
        const url = `${api}/${route}/login`
        
        return await axios.post(url, payload).then(res => res.data)
        .catch(res =>
        {
            console.error(res)
        })
    },

    async register(payload)
    {
        const url = `${api}/${route}`
        
        return await axios.post(url, payload)
    }
}