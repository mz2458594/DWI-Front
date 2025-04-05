import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"

export const OptionsUser = () => {

   const { user, setUser } = useContext(UserContext)
   const navigate = useNavigate()

   const handleClick = () => {
      setUser(null)
      console.log(user)
   }

   return (
      <nav id="user_options">
         <Link className="boton_opciones" to={user === null ? "/login" : "/"}>
            {user === null ? 'Iniciar sesión' :
               <div style={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <h5>{user === null ? 'Iniciar sesión' : `Hola ${user.firstName === undefined ? user.username : user.firstName}`}</h5>
                  <span>Cuentas y listas</span>
               </div>}


         </Link>
         {
            user !== null && <div className="op_usu">
               <Link className="cerrar" to={"/user"}>Información personal</Link>
               <Link className="cerrar" onClick={handleClick} to={"/"}>Cerrar sesión</Link>
            </div>
         }
      </nav>
   )
}