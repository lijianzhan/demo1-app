import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 导入stores
import useAuthStore from './stores/authStore';
import useMemoStore from './stores/memoStore';

// 导入组件
import Login from './components/Login';
import Header from './components/Header';
import MemoList from './components/MemoList';
import MemoDetail from './components/MemoDetail';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

function App() {
  // 使用stores
  const { isLoggedIn, user, loading, initializeAuth, logout } = useAuthStore();
  const { initializeMemos } = useMemoStore();

  // 初始化应用
  useEffect(() => {
    initializeAuth();
    initializeMemos();
  }, [initializeAuth, initializeMemos]);

  // 显示加载状态
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">📝</div>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isLoggedIn ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          <Route 
            path="/" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header user={user} onLogout={logout} />
                  <main className="main-content">
                    <MemoList />
                  </main>
                </>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/memo/:id" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header user={user} onLogout={logout} />
                  <main className="main-content">
                    <MemoDetail />
                  </main>
                </>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="*" 
            element={
              isLoggedIn ? (
                <>
                  <Header user={user} onLogout={logout} />
                  <main className="main-content">
                    <div className="not-found">
                      <h2>页面未找到</h2>
                      <p>抱歉，您访问的页面不存在。</p>
                      <a href="/">返回首页</a>
                    </div>
                  </main>
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
