import { useState } from "react";
import api from "../../apis/axiosClient";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      const { accessToken, user } = res.data.data;

      // ✅ Lưu token và thông tin user
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("🎉 Đăng nhập thành công!");
      setTimeout(() => navigate("/products"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Sai email hoặc mật khẩu!");
    } finally {
      setLoading(false);
    }
  };
  if(token){
    return <Navigate to={'/products'}/>
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-purple-200 px-4">
      {/* Toast thông báo */}
      <ToastContainer position="top-center" autoClose={2500} />

      {/* Overlay loading */}
      {loading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <ClipLoader color="#ffffff" size={60} />
          <p className="text-white mt-3 text-lg font-medium animate-pulse">
            Đang xác thực...
          </p>
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="text-5xl">🧱</span>
            <h1 className="text-3xl font-extrabold text-gray-800">
              ProductApp
            </h1>
          </div>
          <p className="text-gray-500 text-sm">
            Đăng nhập để quản lý sản phẩm hiệu quả hơn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all disabled:opacity-60"
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all disabled:opacity-60"
            />
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all text-amber-950 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
