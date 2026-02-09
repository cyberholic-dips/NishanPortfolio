import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import BlogLayout from './blog/BlogLayout';
import BlogList from './blog/pages/BlogList';
import BlogPostPage from './blog/pages/BlogPost';
import AdminDashboard from './blog/pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogPostPage />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
