import React, { useState } from 'react';

const EditMemoForm = ({ memo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: memo.title,
    content: memo.content,
    category: memo.category,
    priority: memo.priority
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') {
      alert('请输入备忘录标题');
      return;
    }
    onSave(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className="edit-title"
        placeholder="备忘录标题"
      />
      
      <div className="edit-meta">
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="edit-category"
        >
          <option value="work">💼 工作</option>
          <option value="personal">👤 个人</option>
          <option value="study">📚 学习</option>
          <option value="health">🏥 健康</option>
          <option value="shopping">🛒 购物</option>
        </select>
        
        <select
          value={formData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
          className="edit-priority"
        >
          <option value="high">🔴 高优先级</option>
          <option value="medium">🟡 中优先级</option>
          <option value="low">🟢 低优先级</option>
        </select>
      </div>
      
      <textarea
        value={formData.content}
        onChange={(e) => handleInputChange('content', e.target.value)}
        className="edit-content"
        placeholder="在这里写下详细内容..."
        rows="10"
      />
      
      <div className="edit-actions">
        <button type="submit" className="save-btn">
          💾 保存
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          取消
        </button>
      </div>
    </form>
  );
};

export default EditMemoForm;