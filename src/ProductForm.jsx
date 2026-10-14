import { useEffect, useState } from "react";

function ProductForm({ product, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    icon: "📦",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        category: product.category,
        stock: String(product.stock),
        icon: product.icon,
      });
    }
  }, [product]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      form.price.trim() === "" ||
      form.stock.trim() === "" ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return;
    }

    onUpdate({
      ...product,
      name: form.name.trim(),
      price,
      category: form.category.trim(),
      stock,
      icon: form.icon,
    });
  }

  if (!product) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center">
        <span className="text-6xl">✏️</span>

        <h3 className="mt-5 text-xl font-extrabold text-slate-800">
          Ready to make changes?
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          Select any product from the inventory and edit its details here.
        </p>

        <span className="mt-5 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700">
          SELECT A PRODUCT TO BEGIN
        </span>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-slate-900 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
            {product.icon}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-200">
              Edit Mode · #{product.id}
            </p>

            <h3 className="mt-1 text-xl font-extrabold">
              Update Product
            </h3>

            <p className="mt-1 text-sm text-indigo-200">
              Modify the information below.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <div>
          <label className="text-sm font-bold text-slate-700">
            Product Name
          </label>

          <input
            className={inputClass}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-slate-700">
              Price (₹)
            </label>

            <input
              className={inputClass}
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Stock Quantity
            </label>

            <input
              className={inputClass}
              type="number"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">
            Category
          </label>

          <select
            className={inputClass}
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Fashion">Fashion</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Gaming">Gaming</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">
            Product Icon
          </label>

          <div className="mt-3 grid grid-cols-6 gap-2">
            {["💻", "🎧", "⌚", "👟", "📱", "🎮", "📷", "🎒", "🖥️", "🪑", "⌨️", "📦"].map(
              (icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() =>
                    setForm((previous) => ({ ...previous, icon }))
                  }
                  className={`rounded-xl border p-2 text-2xl transition hover:scale-105 ${
                    form.icon === icon
                      ? "border-violet-500 bg-violet-50 ring-2 ring-violet-200"
                      : "border-slate-200 bg-slate-50"
                  }`}
                  aria-label={`Select ${icon} icon`}
                  aria-pressed={form.icon === icon}
                >
                  {icon}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700"
          >
            ✓ Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;