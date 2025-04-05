import './App.css'
import './styles/header.css'
import './styles/products.css'
import './styles/Login.css'
import './styles/crud.css'
import './styles/userOptions.css'

import { Header } from './components/Header'

import { CartProvider } from './context/cart'

import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductsPage } from './components/ProductsPage'
import { Login } from './components/Login'
import { Footer } from './components/Footer'
import { UserProvider } from './context/user'
import { store } from './store'
import { Provider } from 'react-redux'
import { Crud } from './components/crud'
import { Toaster } from 'sonner'
import { UserOptions } from './components/UserOptions'

function App() {

  return (
    <Provider store={store}>
      <UserProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path='/' element={<ProductsPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<Navigate to='/' />} />
            <Route path='/crud' element={<Crud />} />
            <Route path='/user' element={<UserOptions />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
      <Toaster />
    </Provider>
  )
}

export default App
