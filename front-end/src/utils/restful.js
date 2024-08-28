import axios from "axios"

const api = import.meta.env.VITE_API

export default
{
    async store(route, payload)
    {
        let url = `${api}/${route}`
        
        return await axios.post(url, payload).then(res => res.data.response)
        .catch(res =>
        {
            console.error(res)
        })
    },

    async get(route, queries = null)
    {
        let url = `${api}/${route}`

        let queryString = new URLSearchParams(queries)

        let parsedUrl = queries ? `${url}?${queryString}` : url;
        
        return await axios.get(parsedUrl).then(res => res.data.response)
        .catch(res =>
        {
            console.error(res)
        })
    },

    async find(route, id, queries = null)
    {
        let url = `${api}/${route}/${id}`

        let queryString = new URLSearchParams(queries)

        let parsedUrl = queries ? `${url}?${queryString}` : url;
        
        return await axios.get(parsedUrl)
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
        
        return await axios.delete(url).then(res => res.data.response    )
        .catch(res =>
        {
            console.error(res)
        })
    },
}