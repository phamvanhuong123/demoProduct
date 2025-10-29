import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ProductSearch({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value.trim());
    }, 400); // debounce 0.4s
    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center bg-white rounded-xl shadow-sm px-4 py-2 w-full max-w-lg">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full outline-none text-gray-700"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
