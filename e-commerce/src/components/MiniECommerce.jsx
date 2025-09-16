
import { useState, useEffect } from "react";

export default function MiniECommerce() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          MiniECommerce
        </h1>
        <div className="text-gray-700 font-medium">
          Cart: <span className="text-indigo-600">{cart.length}</span>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white p-6 shadow-sm hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="text-gray-600 hover:text-indigo-600 cursor-pointer capitalize"
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-contain mb-4"
                />
                <h3 className="font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize mb-2">
                  {product.category}
                </p>
                <p className="font-semibold text-indigo-600 mb-4">
                  Rp {product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-indigo-600 text-white rounded-xl py-2 px-4 hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
