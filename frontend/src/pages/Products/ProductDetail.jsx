import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../apis/axiosClient";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Load product details
  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await api.put(`/products/${id}`, product);
      alert("Cập nhật thành công!");
      setEditMode(false);
      loadProduct();
    } catch (err) {
      alert("Không thể cập nhật sản phẩm!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Xác nhận xóa sản phẩm này?")) return;
    try {
      await api.delete(`/products/${id}`);
      alert("Đã xóa sản phẩm!");
      navigate("/products");
    } catch (err) {
      alert("Không thể xóa sản phẩm!");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Đang tải sản phẩm...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => navigate("/products")}
          className="text-indigo-600 flex items-center gap-1 mb-4 hover:underline"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </button>

        <h1 className="text-2xl font-bold text-indigo-700 mb-6">
          Chi tiết sản phẩm
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium">Tên sản phẩm</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full p-2 border rounded-lg mt-1 ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Giá (VND)</label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full p-2 border rounded-lg mt-1 ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Danh mục</label>
            <input
              name="category"
              value={product.category}
              onChange={handleChange}
              readOnly={!editMode}
              className={`w-full p-2 border rounded-lg mt-1 ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Mô tả</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              readOnly={!editMode}
              rows={3}
              className={`w-full p-2 border rounded-lg mt-1 ${
                editMode ? "bg-white" : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        {token && (
          <div className="flex justify-end gap-3 mt-6">
            {!editMode ? (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-1"
                >
                  <Trash2 size={16} /> Xóa
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                >
                  <Save size={16} /> Lưu
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
