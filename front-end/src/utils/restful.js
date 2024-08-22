import axios from "axios"

const api = import.meta.env.VITE_API

export default
{
    async get(route)
    {
        const url = `${api}/${route}`
        
        return await axios.get(url).then(res => res.data.response)
        .catch(res =>
        {
            console.error(res)
        })
    },

    async find(route, id)
    {
        const url = `${api}/${route}/${id}`
        
        return await axios.get(url)
    },

    async update(route, id, payload)
    {
        const url = `${api}/${route}/${id}`
        
        return await axios.put(url, payload).then(res => res.data.response)
        .catch(res =>
        {
            console.error(res)
        })
    },

    async delete(route, id)
    {
        const url = `${api}/${route}/${id}`
        
        return await axios.delete(url).then(res => res.data.response)
        .catch(res =>
        {
            console.error(res)
        })
    },
}