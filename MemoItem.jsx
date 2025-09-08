import React from 'react';
import { Link } from 'react-router-dom';

const MemoItem = ({ memo, onDelete, onToggleComplete }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return '💼';
      case 'personal': return '👤';
      case 'study': return '📚';
      case 'health': return '🏥';
      case 'shopping': return '🛒';
      default: return '📝';
    }
  };

  return (
    <div className={`memo-item ${memo.completed ? 'completed' : ''}`}>
      <div className="memo-header">
        <div className="memo-meta">
          <span className="category-icon">{getCategoryIcon(memo.category)}</span>
          <span className="priority-icon">{getPriorityIcon(memo.priority)}</span>
        </div>
        <div className="memo-actions">
          <button
            onClick={() => onToggleComplete(memo.id)}
            className="toggle-btn"
            title={memo.completed ? '标记为未完成' : '标记为已完成'}
          >
            {memo.completed ? '✅' : '⭕'}
          </button>
          <button
            onClick={() => onDelete(memo.id)}
            className="delete-btn"
            title="删除备忘录"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <Link to={`/memo/${memo.id}`} className="memo-link">
        <h3 className="memo-title">
          {memo.title}
        </h3>
      </Link>
      
      <div className="memo-info">
        <span className="memo-date">创建：{memo.createdAt}</span>
        {memo.content && (
          <p className="memo-preview">
            {memo.content.length > 50 
              ? memo.content.substring(0, 50) + '...' 
              : memo.content
            }
          </p>
        )}
      </div>
    </div>
  );
};

export default MemoItem;