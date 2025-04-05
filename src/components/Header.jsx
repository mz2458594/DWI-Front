import { Link } from "react-router-dom"
import { StoreIcon } from "../Icons"
import { Links } from "./Links"
import { OptionsUser } from "./Options"
import { Cart } from "./ShoppingCart"

export const Header = () => {
   return (
      <header id="encabezado">
         <nav>
            <Link to="/" className="storeLogo" >
               <StoreIcon/>
            </Link>
         </nav>

         <nav>
            <form className="form" >
               <input type="text" name="query" placeholder="Buscar...." />
               <button type="submit" id="busc">
                  Buscar
               </button>
            </form>
         </nav>


         <Links
            classname={'boton_opciones'}
            title={'Informacion'}
         />

         <OptionsUser />

         <Links
            classname={'boton_opciones'}
            title={'CRUD'}
            href={'/crud'}
         />


         <Cart />
      </header>
   )
}