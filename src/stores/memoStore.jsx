import { create } from 'zustand';

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

const useMemoStore = create((set, get) => ({
  // 状态
  memos: [],
  
  // 初始化备忘录数据
  initializeMemos: () => {
    try {
      const savedMemos = localStorage.getItem('userMemos');
      if (savedMemos) {
        set({ memos: JSON.parse(savedMemos) });
      } else {
        set({ memos: initialMemos });
        localStorage.setItem('userMemos', JSON.stringify(initialMemos));
      }
    } catch (error) {
      console.error('初始化备忘录数据失败:', error);
      set({ memos: initialMemos });
    }
  },

  // 保存到localStorage的私有方法
  _saveMemos: (memos) => {
    localStorage.setItem('userMemos', JSON.stringify(memos));
  },

  // 添加备忘录
  addMemo: (newMemoData) => {
    const newMemo = {
      ...newMemoData,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    };
    
    const updatedMemos = [...get().memos, newMemo];
    set({ memos: updatedMemos });
    get()._saveMemos(updatedMemos);
  },

  // 删除备忘录
  deleteMemo: (memoId) => {
    if (window.confirm('确定要删除这个备忘录吗？')) {
      const updatedMemos = get().memos.filter(memo => memo.id !== memoId);
      set({ memos: updatedMemos });
      get()._saveMemos(updatedMemos);
    }
  },

  // 更新备忘录
  updateMemo: (memoId, updatedData) => {
    const updatedMemos = get().memos.map(memo => 
      memo.id === memoId 
        ? { 
            ...memo, 
            ...updatedData,
            updatedAt: new Date().toLocaleDateString()
          } 
        : memo
    );
    
    set({ memos: updatedMemos });
    get()._saveMemos(updatedMemos);
  },

  // 切换完成状态
  toggleComplete: (memoId) => {
    const memo = get().memos.find(m => m.id === memoId);
    if (memo) {
      get().updateMemo(memoId, { completed: !memo.completed });
    }
  },

  // 根据ID获取备忘录
  getMemoById: (id) => {
    return get().memos.find(memo => memo.id === parseInt(id));
  }
}));

export default useMemoStore;