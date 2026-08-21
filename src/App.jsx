import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AesPage from './pages/AesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import StatusPage from './pages/StatusPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="aes" element={<AesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="__status" element={<StatusPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
