import Image from 'next/image'
import Showcase from './components/showcase'
import Products from './components/products'
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <main>
      <Header />

      <Showcase />

      <Products />

      <Footer />
    </main>
  )
}
