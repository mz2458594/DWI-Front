import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const Links = ({ classname, title, href}) => {
    return (
        <nav>
            <Link className={classname} to={href}>{title}</Link>
        </nav>
    )
}