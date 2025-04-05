import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

export const login = async credentials => {
    const {data} = axios.post(baseUrl, credentials)
    return data
}


// const getAll = () => {
//     const request = axios.get(baseUrl)
//     const nonExisting = {
//         id: 1000,
//         name: 'User no existing'
//     }

//     return request.then(response => response.data.concat(nonExisting))
// }

// const create = newObject => {
//     const request = axios.post(baseUrl, newObject)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`, newObject)
//     return request.then(response => response.data)
// }

// export default {getAll, create, update}