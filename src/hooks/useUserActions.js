import { useSelector } from "react-redux"
import { addNewUser, deleteUserById, rollBackUser, updateUser } from "../store/users/slice"
import { useAppDispatch } from "./store"
import { toast } from 'sonner'
 
export const useUserActions = () => {
    const dispatch = useAppDispatch()
    const users = useSelector((state) => state.users)


    const removeUser = (id) => {

        const userToRemove = users.find(user => user.id === id)
        dispatch(deleteUserById(id))

        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                if (res.ok) {
                    toast.success(`Usuario ${id} eliminado correctamente`)
                } else {
                    throw new Error('Error al eliminar el usuario')
                }

                
            })
            .catch((err) => {
                console.log(err)
                toast.error(`Error al eliminar al usuario ${id}`)
                if (userToRemove) dispatch(rollBackUser(userToRemove))
            })
    }

    const addUser = ({ username, email, phone, role, password }) => {

        fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, phone, role, password })
        })
            .then(async res => {
                if (!res.ok) throw new Error("Error al registrar un usuario")

                return await res.json()
            })
            .then((data) => {
                const id = data[0][0].id
                dispatch(addNewUser({ id, username, email, phone, role }))
                toast.success(`Usuario agregado correctamente`)
            })
            .catch(error => {
                toast.error(`Error al agregar el usuario`)
                console.error('Error:', error);
            })
    }

    const update = ({ id, username, email, phone, role }) => {


        fetch('http://localhost:3000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, username, email, phone, role })
        })
            .then(async res => {

                if (!res.ok) throw new Error("Error al actualizar un usuario")

                dispatch(updateUser({ id, username, email, phone, role }))
                toast.success(`Usuario actualizado correctamente`)
            })
            .catch(error => {
                toast.error(`Error al actualizar el usuario ${username}`)
                console.error('Error:', error);
            })
    }


    return { removeUser, addUser, update }
}