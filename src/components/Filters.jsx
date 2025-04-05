import { useEffect, useState } from "react"
import { useFilters } from "../hooks/useFilters"

export const Filters = () => {

    const { filters, setFilters, filterProducts } = useFilters()

    const [optionFilter, setOptionFilter] = useState('all')

    const handleChangeMinPrice = (event) => {

        setFilters(prevState => ({
            ...prevState, minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {

        const selectedValue = event.target.value


        setFilters(prevState => ({
            ...prevState, category: event.target.value
        }))

        setOptionFilter(selectedValue);

    }

    useEffect(() => {
        console.log('Options filter: ', optionFilter)
    }, [optionFilter])


    return (
        <section className='filters'>
            <div>
                <label htmlFor="">Precio a partir de: </label>
                <input
                    type="range"
                    min='0'
                    max='1000'
                    value={filters.minPrice}
                    onChange={handleChangeMinPrice} />
                <span>${filters.minPrice}</span>
            </div>


            <div>
                <label htmlFor="category">Categorias:</label>
                <select onChange={handleChangeCategory} value={optionFilter}>
                    <option value="all">Todas</option>
                    <option value="groceries">Groceries</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>
        </section>
    )
}