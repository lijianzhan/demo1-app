import React, { useState, useEffect } from 'react';

//导入路由
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Header from './components/Header';
import MemoList from './components/MemoList';
import MemoDetail from './components/MemoDetail';
import ProtectedRoute from './components/ProtectedRoute';
import './App.scss';

// 初始示例数据
const initialMemos = [
  {
    id: 1,
    title: "完成React项目",
    content: "1. 完成登录页面\n2. 实现备忘录列表\n3. 添加详情页面\n4. 优化样式和交互",
    category: "work",
    priority: "high",
    completed: false,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "购买生活用品",
    content: "- 牙膏\n- 洗发水\n- 面包\n- 牛奶\n- 水果",
    category: "shopping",
    priority: "medium",
    completed: true,
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14"
  },
  {
    id: 3,
    title: "学习JavaScript",
    content: "今天要复习Promise和async/await的用法，做一些练习题。",
    category: "study",
    priority: "high",
    completed: false,
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13"
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 初始化数据
  useEffect(() => {
    const savedUser = localStorage.getItem('memoUser');
    const savedMemos = localStorage.getItem('userMemos');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    } else {
      setMemos(initialMemos);
      localStorage.setItem('userMemos', JSON.stringify(initialMemos));
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('memoUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('memoUser');
  };

  const handleAddMemo = (newMemo) => {
    const memoWithId = {
      ...newMemo,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    };
    const updatedMemos = [...memos, memoWithId];
    setMemos(updatedMemos);
    localStorage.setItem('userMemos', JSON.stringify(updatedMemos));
  };

  const handleDeleteMemo = (memoId) => {
    if (window.confirm('确定要删除这个备忘录吗？')) {
      const updatedMemos = memos.filter(memo => memo.id !== memoId);
      setMemos(updatedMemos);
      localStorage.setItem('userMemos', JSON.stringify(updatedMemos));
    }
  };

  const handleUpdateMemo = (memoId, updatedData) => {
    const updatedMemos = memos.map(memo => 
      memo.id === memoId ? { ...memo, ...updatedData } : memo
    );
    setMemos(updatedMemos);
    localStorage.setItem('userMemos', JSON.stringify(updatedMemos));
  };

  const handleToggleComplete = (memoId) => {
    const updatedMemos = memos.map(memo => 
      memo.id === memoId ? { ...memo, completed: !memo.completed } : memo
    );
    setMemos(updatedMemos);
    localStorage.setItem('userMemos', JSON.stringify(updatedMemos));
  };

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
          {/* 登录路由 */}
          <Route 
            path="/login" 
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          
          {/* 受保护的路由 - 直接渲染内容而不是嵌套Routes */}
          <Route 
            path="/" //主页
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header user={user} onLogout={handleLogout} />
                  <main className="main-content">
                    <MemoList
                      memos={memos}
                      onDeleteMemo={handleDeleteMemo}
                      onAddMemo={handleAddMemo}
                      onToggleComplete={handleToggleComplete}
                    />
                  </main>
                </>
              </ProtectedRoute>
            } 
          />
          
          {/* 备忘录详情页 */}
          <Route 
            path="/memo/:id" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header user={user} onLogout={handleLogout} />
                  <main className="main-content">
                    <MemoDetail
                      memos={memos}
                      onUpdate={handleUpdateMemo}
                    />
                  </main>
                </>
              </ProtectedRoute>
            } 
          />
          
          {/* 404页面 */}
          <Route 
            path="*" 
            element={
              isLoggedIn ? (
                <>
                  <Header user={user} onLogout={handleLogout} />
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