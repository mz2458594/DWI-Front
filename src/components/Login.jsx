import { useContext, useState } from "react"
import { StoreIcon } from "../Icons"
import { Notification } from "./Notification"
import { users as userJson } from "../mocks/users.json"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"

export const Login = () => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault()
        const userFound = userJson.find(user => user.username === username && user.password === password)

        if (userFound) {
            setUser(userFound)
            navigate("/")
        } else {
            setError('Wrong credentials')
            setTimeout(() => {
                setError(null)
            }, 5000)
        }


        // NO BORRAR QUE VA A SERVIR PARA CUANDO TENGAMOS LO DE SPRING JAVA

        // fetch('http://localhost:3000/users/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username, password })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data.user.username)
        //         setUser(data.user)
        //         navigate("/")
        //     })
        //     .catch(error => {
        //         console.error(error)
        //         setError('Wrong credentials')
        //         setTimeout(() => {
        //             setError(null)
        //         }, 5000)
        //     })

        setUsername('')
        setPassword('')

    }


    return (

        <section className="sectionLogin">
            <div>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800'
                }}>Iniciar sesion</h1>
                <Notification message={error} />

            </div>

            <div className="login">

                <form className="loginForm" onSubmit={handleSubmit}>
                    <label htmlFor="name">Ingrese su correo: </label>
                    <input type="text" onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                    <label htmlFor="" style={{
                        color: '#afafaf'
                    }}>
                        Ingrese su contraseña:
                    </label>
                    <input type="text" onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                    <button>Iniciar sesión</button>
                </form>

                <div>
                    <StoreIcon />
                </div>

            </div>


        </section>

    )
}
