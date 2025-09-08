import React, { useState } from 'react';

const AddMemoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'work',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') {
      alert('请输入备忘录标题');
      return;
    }
    onSubmit(formData);
    setFormData({
      title: '',
      content: '',
      category: 'work',
      priority: 'medium'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="输入备忘录标题"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        className="title-input"
      />
      
      <textarea
        placeholder="输入详细内容（可选）"
        value={formData.content}
        onChange={(e) => handleInputChange('content', e.target.value)}
        className="content-input"
        rows="3"
      />
      
      <div className="form-row">
        <select
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className="category-select"
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
          className="priority-select"
        >
          <option value="high">🔴 高优先级</option>
          <option value="medium">🟡 中优先级</option>
          <option value="low">🟢 低优先级</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          添加
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          取消
        </button>
      </div>
    </form>
  );
};

export default AddMemoForm;