import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MemoItem from './MemoItem';
import AddMemoForm from './AddMemoForm';

const MemoList = ({ memos, onDeleteMemo, onAddMemo, onToggleComplete }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMemo = (memoData) => {
    onAddMemo(memoData);
    setShowAddForm(false);
  };

  return (
    <div className="memo-list">
      <div className="list-header">
        <h2>备忘录列表</h2>
        <button 
          className="add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '取消' : '+ 新建备忘录'}
        </button>
      </div>

      {showAddForm && (
        <AddMemoForm 
          onSubmit={handleAddMemo}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="memo-items">
        {memos.length === 0 ? (
          <div className="empty-state">
            <p>📋 还没有备忘录，点击上方按钮创建第一个吧！</p>
          </div>
        ) : (
          memos.map(memo => (
            <MemoItem
              key={memo.id}
              memo={memo}
              onDelete={onDeleteMemo}
              onToggleComplete={onToggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MemoList;