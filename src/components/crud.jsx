import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useUserActions } from "../hooks/useUserActions"

export const Crud = () => {

    const users = useSelector((state) => state.users)
    const { addUser, removeUser, update } = useUserActions()
    const [result, setResult] = useState(null)
    const [editing, setEditing] = useState(null)
    const [search, setSearch] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState(users)



    const handleSubmit = async (event) => {
        event.preventDefault()
        setResult(null)

        const form = event.target
        const formData = new FormData(form)

        const username = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const role = formData.get('role')
        const password = formData.get('password')
        const confirmPassword = formData.get('confirm')

        if (password.length < 6) {
            return setResult('passwordLength')
        }

        if (password !== confirmPassword) {
            return setResult('notSamePassword')
        }


        if (!username || !email || !phone || !role || !password || !confirmPassword) {
            return setResult('ko')
        }

        addUser({ username, email, phone, role, password })

        //setResult('ok')
        form.reset()
    }

    const handleUpdate = (event) => {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        const username = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const role = formData.get('role')

        update({ id: editing, username, email, phone, role })

        setEditing(null)

    }

    const searchUsers = (value) => {


        const filterUser = users.filter((user) => user.username.toLowerCase().includes(value) ||  user.email.toLowerCase().includes(value))

        setFilteredUsers(filterUser)

    }

    useEffect(() => {
        setFilteredUsers(users)
    }, [users])


    return (
        <section className="crud">

            <form className="search" >
                <input type="text" placeholder="Buscar por nombre" onChange={(event) => {
                    searchUsers(event.target.value)
                }} />
                <button type="reset" onClick={() => {
                    setFilteredUsers(users)
                }}>
                    Reset
                </button>
            </form>

            <div className="table">
                <h1 style={{ textAlign: 'left' }}>Usuarios ({filteredUsers.length})</h1>
                <table>
                    <thead className="thead">
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="tbody">
                        {filteredUsers.map((user) => (
                            <tr style={{ borderBottom: '1px solid white' }} key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="updateButton" onClick={() => setEditing(editing === user.id ? null : user.id)}>Actualizar</button>
                                    {editing === user.id && <div className="updateForm">
                                        <form onSubmit={handleUpdate}>
                                            <caption>Actualizar usuario</caption>
                                            <input type="text" placeholder="Ingrese el nombre" name="name" autoComplete="off" defaultValue={user.username} />
                                            <input type="email" placeholder="Ingrese el email" name="email" autoComplete="off" defaultValue={user.email} />
                                            <input type="text" placeholder="Ingrese el numero de telefono" name="phone" autoComplete="off" defaultValue={user.phone} />
                                            <select name="role" defaultValue={user.role}>
                                                <option value="none">Seleccione el rol</option>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                            </select>
                                            <button type="submit">Actualizar</button>
                                            <button onClick={() => setEditing(null)}>Cerrar</button>
                                        </form>
                                    </div>}
                                    <button onClick={() => { removeUser(user.id) }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="create">
                <h1 style={{ textAlign: 'left' }}>Create new User</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ingrese el nombre" name="name" autoComplete="off" />
                    <input type="text" placeholder="Ingrese el email" name="email" autoComplete="off" />
                    <input type="text" placeholder="Ingrese el telefono" name="phone" autoComplete="off" />
                    <input type="password" placeholder="Ingrese su contraseña" name="password" autoComplete="off" />
                    <input type="password" placeholder="Ingrese de nuevo la contraseña" name="confirm" autoComplete="off" />
                    <select name="role" defaultValue='User'>
                        <option value="none">Seleccione el rol</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>

                    <div>
                        {
                            result === 'ok' && (
                                <span style={{ color: 'white' }}>Guardado correctamente</span>
                            )
                        }
                        {
                            result === 'ko' && (
                                <span style={{ color: 'red' }}>*Error en los campos</span>
                            )
                        }
                        {
                            result === 'notSamePassword' && (
                                <span style={{ color: 'red' }}>*Las contraseña no coinciden</span>
                            )
                        }
                        {
                            result === 'passwordLength' && (
                                <span style={{ color: 'red' }}>*La contraseña debe tener como mínimo 6 caractéres</span>
                            )
                        }
                        <button type="submit">Agregar usuario</button>
                    </div>

                </form>
            </div>



        </section>
    )
}