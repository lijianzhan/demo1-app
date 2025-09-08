import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>📝 我的备忘录</h1>
        </div>
        <div className="user-info">
          <span className="user-avatar">{user.avatar}</span>
          <span className="user-name">你好，{user.name}</span>
          <button onClick={onLogout} className="logout-btn">
            退出
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;