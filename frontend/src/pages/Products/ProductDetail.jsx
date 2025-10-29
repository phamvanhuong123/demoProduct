import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../apis/axiosClient";
import { ArrowLeft, Save } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ⚡ Quan trọng
import { ClipLoader } from "react-spinners";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  //  Load sản phẩm
  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/product/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      toast.error(" Lỗi khi tải sản phẩm!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  //  Xử lý thay đổi input
  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  //  Cập nhật sản phẩm
  const handleSave = async () => {
    try {
      const dataProduct = { ...product };
      delete dataProduct._id;

      const res = await api.put(`/product/update/${id}`, dataProduct,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProduct(res.data.data || dataProduct);
      setEditMode(false);

      //  Hiển thị toast thành công
      toast.success(" Cập nhật thành công!");
    } catch (err) {
      //  Hiển thị lỗi
      toast.error(" Không thể cập nhật sản phẩm!");
      console.error(err);
    }
  };

  //  Nếu đang loading
  if (loading || !product)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4F46E5" size={50} />
        <p className="text-gray-500 ml-3">Đang tải sản phẩm...</p>
        {/*  Đặt ToastContainer ở đây để toast vẫn hoạt động khi load */}
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </div>
    );

  //  Giao diện chính
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-indigo-600 flex items-center gap-1 mb-4 hover:underline"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </button>

        <h1 className="text-2xl font-bold text-indigo-700 mb-6">
          Chi tiết sản phẩm
        </h1>

        <div className="space-y-4">
          {["name", "price", "category", "description"].map((field, i) => (
            <div key={i}>
              <label className="text-gray-600 font-medium capitalize">
                {field === "price"
                  ? "Giá (VND)"
                  : field === "category"
                  ? "Danh mục"
                  : field === "description"
                  ? "Mô tả"
                  : "Tên sản phẩm"}
              </label>
              {field === "description" ? (
                <textarea
                  name={field}
                  value={product[field]}
                  onChange={handleChange}
                  readOnly={!editMode}
                  rows={3}
                  className={`w-full p-2 border rounded-lg mt-1 ${
                    editMode ? "bg-white" : "bg-gray-100"
                  }`}
                />
              ) : (
                <input
                  name={field}
                  value={product[field]}
                  onChange={handleChange}
                  readOnly={!editMode}
                  type={field === "price" ? "number" : "text"}
                  className={`w-full p-2 border rounded-lg mt-1 ${
                    editMode ? "bg-white" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {token && (
          <div className="flex justify-end gap-3 mt-6">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-indigo-600 text-amber-950 rounded-lg hover:bg-indigo-700 transition"
              >
                Chỉnh sửa
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-amber-950 rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                >
                  <Save size={16} /> Lưu
                </button>
                <button
                  type="button"
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

      {/*  ToastContainer luôn có ở cuối */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}
