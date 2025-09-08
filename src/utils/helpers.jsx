export const getCategoryText = (category) => {
  switch (category) {
    case 'work': return '💼 工作';
    case 'personal': return '👤 个人';
    case 'study': return '📚 学习';
    case 'health': return '🏥 健康';
    case 'shopping': return '🛒 购物';
    default: return '📝 其他';
  }
};

// 获取优先级显示文本
export const getPriorityText = (priority) => {
  switch (priority) {
    case 'high': return '🔴 高优先级';
    case 'medium': return '🟡 中优先级';
    case 'low': return '🟢 低优先级';
    default: return '⚪ 未设置';
  }
};

// 获取分类图标
export const getCategoryIcon = (category) => {
  switch (category) {
    case 'work': return '💼';
    case 'personal': return '👤';
    case 'study': return '📚';
    case 'health': return '🏥';
    case 'shopping': return '🛒';
    default: return '📝';
  }
};

// 获取优先级图标
export const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
};