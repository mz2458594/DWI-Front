import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { CartIcon, ClearCartIcon } from "../Icons"

export const ShoppingCart = ({ price, title, quantity, addToCart, reduceFromCart }) => {

    return (
        <div className="info_product" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        }}>
            <button onClick={reduceFromCart} style={{
                backgroundColor: '#de0900'
            }}>-</button>
            <span className="cantidad_product">
                {quantity ? quantity : 0}
            </span>
            <button onClick={addToCart} style={{
                backgroundColor: '#de0900'
            }}>+</button>

            <span className="titulo_product">
                {title ? title : 'Ningun producto'}
            </span>
            <span className="precio_product">
                ${price ? price : 0}
            </span>
        </div>
    )
}


export function Cart() {
    const { cart, clearCart, addToCart, reduceFromCart } = useCart()

    let quantity = cart.reduce((total, product) => total + product.quantity, 0)

    return (
        <>

            <nav id="carrito_compra">
                <Link>
                    <CartIcon />
                    <div className="cantidad_productos">
                        <span id="contador">{quantity}</span>
                    </div>
                </Link>

                <div className="info_producto">
                    <div className="row_product">
                        <div className="cart_product" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            {
                                cart.map(product => (
                                    <ShoppingCart
                                        key={product.id}
                                        addToCart={() => addToCart(product)}
                                        reduceFromCart={() => reduceFromCart(product)}
                                        {...product}
                                    />
                                ))
                            }

                        </div>
                        <button onClick={clearCart} style={{
                            margin: '10px',
                        }}>
                            <ClearCartIcon />
                        </button>
                    </div>
                </div>



            </nav>


        </>
    )

}
