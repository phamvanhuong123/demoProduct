import { useState } from "react";
import api from "../../apis/axiosClient";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.warning(" Vui lòng nhập tên và giá sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/product/create", form);
      toast.success(" Thêm sản phẩm thành công!");
      setForm({ name: "", price: "", category: "", description: "" });
      onCreated();
    } catch (err) {
      toast.error(" Không thể thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <Plus size={20} /> Thêm sản phẩm mới
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["name", "price", "category", "description"].map((field, i) => (
          <input
            key={i}
            type={field === "price" ? "number" : "text"}
            placeholder={
              field === "name"
                ? "Tên sản phẩm"
                : field === "price"
                ? "Giá (VND)"
                : field === "category"
                ? "Danh mục"
                : "Mô tả"
            }
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            disabled={loading}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-300 disabled:opacity-60"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-5 w-full md:w-auto px-6 py-2 rounded-lg text-amber-950 transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
        }`}
      >
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>
    </div>
  );
}
