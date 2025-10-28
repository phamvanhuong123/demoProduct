import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-3 bg-gray-100 shadow-sm" style={{width : '100vw', padding : '10px 20px'}} >
      <Link to="/products" className="font-bold text-xl">📦 ProductApp</Link>
      <div>
        {token ? (
          <button onClick={logout} className="text-red-600 font-semibold">Đăng xuất</button>
        ) : (
          <Link to="/login" className="text-blue-600 font-semibold"></Link>
        )}
      </div>
    </div>
  );
}
