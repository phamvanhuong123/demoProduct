import { useState, useEffect } from "react";
import api from "../../apis/axiosClient";
import { Link } from "react-router-dom";
import ProductSearch from "./ProductSearch";
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("token");

  const load = async () => {
   
       await api.get(`/product?keyword=${keyword}`).then(products =>{
        console.log(products)
        setProducts(products.data.data || []);
      }).catch(err =>{
        console.error("Load products failed", err);
      })
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa sản phẩm này?")) {
      await api.delete(`/product/delete/${id}`);
      load();
    }
  };

  useEffect(() => {
    load();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          🛍️ Quản lý sản phẩm
        </h1>

        <ProductSearch onSearch={setKeyword} />

        {token && <ProductForm onCreated={load} />}

        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Danh sách sản phẩm ({products.length})
          </h2>

          {products.length === 0 ? (
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
