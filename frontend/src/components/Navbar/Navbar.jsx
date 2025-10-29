import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/axiosClient";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  // 🧠 Lấy thông tin người dùng khi có token
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error("❌ Lỗi lấy thông tin người dùng:", err);
        toast.error("⚠️ Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [token, navigate]);

  // 🧹 Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("👋 Đã đăng xuất!");
    navigate("/login");
  };

  return (
    <div
      className="flex justify-between items-center bg-gray-100 shadow-sm"
      style={{
        width: "100vw",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link to="/products" className="font-bold text-xl text-indigo-700">
        📦 ProductApp
      </Link>

      {/* Phần bên phải */}
      <div className="flex items-center gap-4">
        {token && user ? (
          <>
            <span className="text-gray-700 font-medium">
              👤 {user.name || "Người dùng"}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold hover:underline"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
