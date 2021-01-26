const clearAuthFromLocalStorage = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
};

const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;

  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }

  return false;
};

const saveAuthToLocalStorage = (jwt) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'jwt',
      JSON.stringify(jwt),
    );
  }
};

export { clearAuthFromLocalStorage, isAuthenticated, saveAuthToLocalStorage };
