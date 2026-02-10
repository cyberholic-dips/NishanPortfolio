import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './Portfolio';
import BlogLayout from './blog/BlogLayout';
import BlogList from './blog/pages/BlogList';
import BlogPostPage from './blog/pages/BlogPost';
import AdminDashboard from './blog/pages/AdminDashboard';
import LoginPage from './blog/pages/LoginPage';
import { isAuthenticated } from './blog/auth';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/blog/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogPostPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
