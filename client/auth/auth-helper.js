const clear = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('user');
};

const get = () => {
  if (typeof window === 'undefined') return {};

  return {
    user: JSON.parse(localStorage.getItem('user')),
  };
};

const save = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'user',
      JSON.stringify(data),
    );
  }
};

export { clear, get, save };
