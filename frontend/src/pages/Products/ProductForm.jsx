import { useState } from "react";
import api from "../../apis/axiosClient";
import { Plus } from "lucide-react";

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      alert("Vui lòng nhập tên và giá sản phẩm!");
      return;
    }

    try {
      await api.post("/product/create", form);
      setForm({ name: "", price: "", category: "", description: "" });
      onCreated();
    } catch (err) {
      alert("Không thể thêm sản phẩm!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <Plus size={20} /> Thêm sản phẩm mới
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="number"
          placeholder="Giá (VND)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="text"
          placeholder="Danh mục"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-5 w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
      >
        Thêm sản phẩm
      </button>
    </div>
  );
}
