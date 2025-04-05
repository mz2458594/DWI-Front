import { useCart } from "../hooks/useCart"

export function Footer () {
    const {cart} = useCart()

    return (
        <>
        <footer className="footer">
            {JSON.stringify(cart, null)}
        </footer>
        </>
    )
}