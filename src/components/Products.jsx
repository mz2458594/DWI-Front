/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart"
import { AddToCartIcon, RemoveFromCartIcon } from "../Icons"

export function Products({ products }) {

    const { addToCart, cart, removeFromCart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    return (

        <div className="product-grid">
            {
                products.map(product => {
                    const isProductInCart = checkProductInCart(product)
                    return (
                        <div className="product-card" key={product.id}>
                            <div id="cat" >
                                <img src={product.thumbnail} alt={product.title} />
                                <h3 className="nombre" >{product.price}</h3>
                                <p className="price">Precio: $<strong className="precio" >{product.price}</strong></p>
                                <p>Categoría: <strong className="categoria" >{product.category}</strong></p>
                                <button
                                    style={{ background: isProductInCart ? '#09f' : '#59BF40' }}
                                    onClick={() => {
                                        isProductInCart ? removeFromCart(product) : addToCart(product)
                                    }}
                                >
                                    {
                                        isProductInCart ? <RemoveFromCartIcon/> : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}