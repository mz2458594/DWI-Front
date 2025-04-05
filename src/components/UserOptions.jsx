import { useContext } from "react"
import { UserContext } from "../context/user"

export const UserOptions = () => {
    const { user } = useContext(UserContext)

    return (
        <>
        
            <section className="options">

                <h1 className="title">Inicio de sesión y seguridad</h1>

                <div className="editOptions">
                    <BlockOptions title={"Nombre"} userAtributte={user.username}/>
                    <BlockOptions title={"Email"} userAtributte={user.email}/>
                    <BlockOptions title={"Phone"} userAtributte={user.phone}/>

                </div>

            </section>

        </>
    )
}


export const BlockOptions = ({title, userAtributte}) => {
    return (
        <div className="blockOptions">
            <div className="userAtributtes">
                <div>
                    {title}
                </div>

                <div>
                    {userAtributte}
                </div>
            </div>

            <div className="editButton">
                <a>Editar</a>
            </div>
        </div>
    )
}