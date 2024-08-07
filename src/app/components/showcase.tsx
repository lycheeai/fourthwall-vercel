export default function Showcase() {
  return <section id="showcase" 
    className="bg-cover bg-center h-[600px] flex items-center justify-left text-white p-20" 
    style={{backgroundImage: "url('/rocket.jpg')"}}
  >
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
      <p className="text-xl">Discover amazing products that will change your life!</p>
    </div>
  </section>
}
