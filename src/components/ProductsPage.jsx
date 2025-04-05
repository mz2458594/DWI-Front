import { useState } from 'react'
import { products as initialProducts } from '../mocks/productos.json'
import { useFilters } from "../hooks/useFilters"


import { Filters } from "./Filters"
import { Products } from './Products'


export const ProductsPage = () => {

    const [products] = useState(initialProducts)
    const { filterProducts } = useFilters()
    const filteredProducts = filterProducts(products)

    return (
        <>
            <h1 style={{
                backgroundColor: '#1e232e',
                padding: '10px'
            }}>Productos</h1>
            <Filters />
            <Products products={filteredProducts} />
        </>
    )
}