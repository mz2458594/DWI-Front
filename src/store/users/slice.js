import { createSlice } from "@reduxjs/toolkit"

let DEFAULT = [
    {
        id: "1",
        username: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        phone: 940231231,
        role: "admin"
    },
    {
        id: "2",
        username: "John Doe",
        email: "leo@gmail.com",
        phone: 123456789,
        role: "user"
    },
    {
        id: "3",
        username: "Haakon Dahlberg",
        email: "haakon@gmail.com",
        phone: 321654987,
        role: "user"
    }

]


// NO BORRAR QUE VA A SERVIR PARA CUANDO TENGAMOS LO DE SPRING JAVA

// const DEFAULT_STATE = await fetch('http://localhost:3000/users', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
// })
//     .then(res => res.json())
//     .then((data) => {
//         return data
//     })


const DEFAULTS = []



export const UserSlice = createSlice({
    name: "users",
    initialState: DEFAULT,
    reducers: {
        addUsers: (state, action) => {
            state.push(...action.payload)
        },
        addNewUser: (state, action) => {
            //const id = crypto.randomUUID()
            state.push({ ...action.payload })
        },
        deleteUserById: (state, action) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        },
        updateUser: (state, action) => {
            const { id, ...updateFields } = action.payload
            const userIndex = state.findIndex(user => user.id === id)
            console.log(state[userIndex] = { ...state[userIndex], ...updateFields })
            if (userIndex !== -1) {
                state[userIndex] = { ...state[userIndex], ...updateFields }
            }
        },
        rollBackUser: (state, action) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)

            if (!isUserAlreadyDefined) {
                return [...state, action.payload]
            }
        }
    }

});


export default UserSlice.reducer

export const { addNewUser, deleteUserById, updateUser, addUsers, rollBackUser } = UserSlice.actions