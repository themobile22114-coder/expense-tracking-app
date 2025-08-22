export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH');
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getDateRange = (period) => {
  const now = new Date();
  
  switch (period) {
    case 'today':
      return now.toISOString().split('T')[0];
    case 'week':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'month':
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
};