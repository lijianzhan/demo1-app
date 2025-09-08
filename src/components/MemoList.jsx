import React, { useState } from 'react';
import useMemoStore from '../stores/memoStore';
import MemoItem from './MemoItem';
import AddMemoForm from './AddMemoForm';

const MemoList = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { 
    memos, 
    addMemo, 
    deleteMemo, 
    toggleComplete 
  } = useMemoStore();

  const handleAddMemo = (memoData) => {
    addMemo(memoData);
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
              onDelete={deleteMemo}
              onToggleComplete={toggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MemoList;