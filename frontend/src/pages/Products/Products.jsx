import { useState, useEffect } from "react";
import api from "../../apis/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSearch from "./ProductSearch";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import { ClipLoader } from "react-spinners";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  //  Gọi API lấy danh sách sản phẩm
  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product?keyword=${keyword}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Load products failed", err);
      toast.error("❌ Không thể tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  //  Xử lý xóa sản phẩm
  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa sản phẩm này?")) return;
    try {
      await api.delete(`/product/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(" Đã xóa sản phẩm!");
      load();
    } catch (err) {
      toast.error(" Xóa sản phẩm thất bại!");
      console.error(err);
    }
  };

  //  Gọi load khi tìm kiếm hoặc mở trang
  useEffect(() => {
    load();
  }, [keyword]);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Overlay loading */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <ClipLoader color="#ffffff" size={60} />
          <p className="text-white mt-3 text-lg font-medium animate-pulse">
            Đang tải dữ liệu...
          </p>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
           Quản lý sản phẩm
        </h1>

        {/* Tìm kiếm */}
        <ProductSearch onSearch={setKeyword} />

        {/* Form thêm sản phẩm (nếu có token) */}
        {token && <ProductForm onCreated={load} />}

        {/* Danh sách sản phẩm */}
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Danh sách sản phẩm ({products.length})
          </h2>

          {/* Nếu không có sản phẩm */}
          {products.length === 0 && !loading ? (
            <p className="text-gray-500 text-center py-4">
              Không có sản phẩm nào.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onDelete={() => handleDelete(p._id)}
                  canDelete={!!token}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
