import Image from 'next/image'
import Showcase from './showcase'
import Products from './products'

export default function Home() {
  return (
    <main>
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Store</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#home" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#products" className="hover:text-gray-300">Products</a></li>
                        <li><a href="#about" className="hover:text-gray-300">About</a></li>
                    </ul>
                </nav>
            </div>
        </div>
      </header>

      <Showcase />

      <Products />

      <footer>
          <p>&copy; 2024 My Store. All rights reserved.</p>
          <nav>
              <a href="#privacy">Privacy Policy</a> |
              <a href="#terms">Terms of Service</a> |
              <a href="#contact">Contact Us</a>
          </nav>
      </footer>
    </main>
  )
}
