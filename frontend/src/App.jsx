import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/post-job" element={<PostPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* Admin Routes */}
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        } 
      />
      
      {/* njia yoyote isiyojulikana inarudi nyumbani */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
