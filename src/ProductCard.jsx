const gradients = [
  "from-violet-500 to-indigo-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-fuchsia-500 to-purple-600",
];

function ProductCard({ product, index, onEdit, isSelected }) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isSelected
          ? "border-violet-500 ring-2 ring-violet-200"
          : "border-slate-200"
      }`}
    >
      <div
        className={`flex h-36 items-center justify-center bg-gradient-to-br ${
          gradients[index % gradients.length]
        }`}
      >
        <span className="text-6xl transition duration-300 group-hover:scale-110">
          {product.icon}
        </span>

        <span className="ml-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Product #{String(product.id).padStart(3, "0")}
            </p>

            <h3 className="mt-2 text-lg font-extrabold text-slate-800">
              {product.name}
            </h3>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              product.stock > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Product Price</p>

            <p className="mt-1 text-2xl font-black text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {product.stock} units available
            </p>
          </div>

          <button
            onClick={() => onEdit(product)}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
              isSelected
                ? "bg-violet-100 text-violet-700"
                : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
          >
            {isSelected ? "✓ Selected" : "✎ Edit"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;