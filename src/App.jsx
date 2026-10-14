import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const initialProducts = [
  {
    id: 1,
    name: "MacBook Air M3",
    price: 114900,
    category: "Electronics",
    stock: 12,
    icon: "💻",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 2499,
    category: "Accessories",
    stock: 28,
    icon: "🎧",
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 4999,
    category: "Electronics",
    stock: 16,
    icon: "⌚",
  },
  {
    id: 4,
    name: "Running Sneakers",
    price: 3299,
    category: "Fashion",
    stock: 20,
    icon: "👟",
  },
  {
    id: 5,
    name: "Gaming Controller",
    price: 3599,
    category: "Gaming",
    stock: 8,
    icon: "🎮",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 18499,
    category: "Electronics",
    stock: 5,
    icon: "📷",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, search]);

  function handleEdit(product) {
    setSelectedProduct(product);
    setMessage("");
  }

  function handleUpdate(updatedProduct) {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    setSelectedProduct(null);
    setMessage(`${updatedProduct.name} updated successfully!`);

    window.setTimeout(() => {
      setMessage("");
    }, 3500);
  }

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HERO HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/20">
                📦
              </div>

              <div>
                <h1 className="text-lg font-black tracking-wide">
                  NOVA<span className="text-cyan-300">STORE</span>
                </h1>

                <p className="text-xs text-indigo-200">
                  Smart Product Management
                </p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
              ● Inventory Active
            </span>
          </nav>

          <div className="grid items-center gap-8 py-12 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <span className="inline-flex rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
                React Practical · Update Operation
              </span>

              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Manage Products.
                <br />

                <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                  Make Every Update Count.
                </span>
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-indigo-100/80">
                Select a product, edit its information, and update your
                inventory through a clean, interactive React interface.
              </p>

              <a
                href="#inventory"
                className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-indigo-950 shadow-lg transition hover:-translate-y-1 hover:bg-cyan-100"
              >
                Explore Inventory ↓
              </a>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-7 shadow-2xl backdrop-blur-xl">
              <p className="text-sm text-indigo-200">
                Total Inventory Value
              </p>

              <h3 className="mt-3 break-words text-3xl font-black sm:text-4xl">
                ₹{totalValue.toLocaleString("en-IN")}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-indigo-200">Products</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {products.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-indigo-200">Units in Stock</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {totalStock}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs text-indigo-200/70">
                Inventory totals update automatically after saving changes.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* SUCCESS MESSAGE */}
        {message && (
          <div
            role="status"
            className="mb-7 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl">
              ✓
            </span>

            <div>
              <p className="font-extrabold">Product Updated Successfully!</p>
              <p className="mt-1 text-sm">{message}</p>
            </div>

            <button
              onClick={() => setMessage("")}
              className="ml-auto rounded-lg px-3 py-2 font-bold hover:bg-emerald-100"
              aria-label="Dismiss success message"
            >
              ✕
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
            Overview
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Inventory Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Monitor and maintain your product information.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Total Products",
                value: products.length,
                icon: "📦",
                color: "from-violet-500 to-indigo-600",
              },
              {
                title: "Available Units",
                value: totalStock,
                icon: "📊",
                color: "from-cyan-500 to-blue-600",
              },
              {
                title: "Inventory Value",
                value: `₹${totalValue.toLocaleString("en-IN")}`,
                icon: "💰",
                color: "from-emerald-500 to-teal-600",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-2xl shadow-md`}
                >
                  {stat.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <h3 className="mt-1 break-words text-2xl font-black text-slate-800">
                    {stat.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INVENTORY AND EDITOR */}
        <section
          id="inventory"
          className="scroll-mt-6 grid items-start gap-8 pt-14 lg:grid-cols-[1.3fr_0.7fr]"
        >
          <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Product catalogue
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Existing Products
                </h2>
              </div>

              <div className="relative sm:w-64">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  🔍
                </span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm text-slate-500">
                Products in catalogue
              </span>

              <span className="rounded-lg bg-violet-50 px-3 py-1 font-bold text-violet-700">
                {filteredProducts.length}
              </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onEdit={handleEdit}
                  isSelected={selectedProduct?.id === product.id}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-4xl">🔎</p>
                <h3 className="mt-3 font-bold">No products found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try searching with another product name or category.
                </p>
              </div>
            )}
          </div>

          {/* EDIT FORM */}
          <div className="lg:sticky lg:top-5">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Product editor
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Edit Details
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Select a product to enable editing.
              </p>
            </div>

            <ProductForm
              product={selectedProduct}
              onUpdate={handleUpdate}
              onCancel={() => setSelectedProduct(null)}
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-14 rounded-3xl bg-gradient-to-r from-indigo-950 via-violet-950 to-slate-900 p-7 text-white shadow-xl sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Practical workflow
          </p>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            How the Update Operation Works
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Select", "Choose a product from the inventory."],
              ["02", "Edit", "Modify its name, price, category, or stock."],
              ["03", "Update", "Submit the edited information."],
              ["04", "Verify", "See the updated product and inventory totals."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <span className="text-sm font-black text-cyan-300">
                  STEP {number}
                </span>

                <h3 className="mt-3 text-lg font-bold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-indigo-100/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-slate-200 bg-white px-5 py-7 text-center">
        <p className="font-black tracking-wide">
          NOVA<span className="text-violet-600">STORE</span>
        </p>

        <p className="mt-2 text-sm text-slate-500">
          React Practical 08 · Update Operation
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Built with React JS and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;