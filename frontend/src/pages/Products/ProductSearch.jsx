import { Search } from "lucide-react";

export default function ProductSearch({ onSearch }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center bg-white rounded-xl shadow-sm px-4 py-2 w-full max-w-lg">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full outline-none text-gray-700"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
