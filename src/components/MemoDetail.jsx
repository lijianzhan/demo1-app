import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMemoStore from '../stores/memoStore';
import EditMemoForm from './EditMemoForm';
import { getCategoryText, getPriorityText } from '../utils/helpers';

const MemoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const { getMemoById, updateMemo } = useMemoStore();
  
  // 根据ID查找备忘录
  const memo = getMemoById(id);
  
  // 如果找不到备忘录，显示错误信息
  if (!memo) {
    return (
      <div className="memo-detail">
        <div className="detail-header">
          <button onClick={() => navigate('/')} className="back-btn">
            ← 返回列表
          </button>
        </div>
        <div className="error-message">
          <h2>😕 备忘录未找到</h2>
          <p>您要查看的备忘录可能已被删除或不存在。</p>
          <button onClick={() => navigate('/')} className="back-home-btn">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (updatedData) => {
    updateMemo(memo.id, updatedData);
    setIsEditing(false);
  };

  return (
    <div className="memo-detail">
      <div className="detail-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← 返回列表
        </button>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="edit-btn"
        >
          {isEditing ? '取消编辑' : '✏️ 编辑'}
        </button>
      </div>

      {isEditing ? (
        <EditMemoForm
          memo={memo}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="detail-content">
          <h1 className="detail-title">{memo.title}</h1>
          
          <div className="detail-meta">
            <span className="meta-item">{getCategoryText(memo.category)}</span>
            <span className="meta-item">{getPriorityText(memo.priority)}</span>
            <span className="meta-item">
              {memo.completed ? '✅ 已完成' : '⭕ 未完成'}
            </span>
          </div>
          
          <div className="detail-dates">
            <p>📅 创建时间：{memo.createdAt}</p>
            {memo.updatedAt !== memo.createdAt && (
              <p>🔄 更新时间：{memo.updatedAt}</p>
            )}
          </div>
          
          <div className="detail-text">
            <h3>📝 详细内容：</h3>
            <div className="content-display">
              {memo.content ? (
                <pre>{memo.content}</pre>
              ) : (
                <p className="no-content">暂无详细内容，点击编辑按钮添加内容。</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoDetail;