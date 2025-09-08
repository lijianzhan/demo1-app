import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('请输入用户名和密码');
      return;
    }
    
    // 模拟登录验证
    if (username === 'user' && password === '123456') {
      onLogin({
        username: username,
        name: '用户',
        avatar: '👤'
      });
      setError('');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>📝 个人备忘录</h2>
        <p className="login-subtitle">记录生活，管理事务</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>用户名</label>
            <input
              type="text"
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>密码</label>
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;