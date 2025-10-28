import { Link } from "react-router-dom";
import { Trash2, Edit3 } from "lucide-react";

export default function ProductCard({ product, onDelete, canDelete }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
        {product.description || "Không có mô tả."}
      </p>
      <p className="text-indigo-600 font-semibold mb-1">
        💰 {Number(product.price).toLocaleString("vi-VN")} VND
      </p>
      <p className="text-sm text-gray-500">📂 {product.category || "Chưa phân loại"}</p>

      <div className="flex justify-between items-center mt-3">
        <Link
          to={`/products/${product._id}`}
          className="text-blue-600 text-sm hover:underline flex items-center gap-1"
        >
          <Edit3 size={14} /> Chi tiết
        </Link>
        {canDelete && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
