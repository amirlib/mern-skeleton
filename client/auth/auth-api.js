const loginRequest = async (user) => {
  const response = await fetch(
    '/auth/login/',
    {
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  return await response.json();
};

const logoutRequest = async (isLogoutFromAll) => {
  const path = isLogoutFromAll ? 'logoutAll' : 'logout';

  const response = await fetch(
    `/auth/${path}/`,
    {
      credentials: 'include',
      method: 'GET',
    },
  );

  return await response.json();
};

const verifyRequest = async () => {
  const response = await fetch(
    '/auth/verify/',
    {
      credentials: 'include',
      method: 'POST',
    },
  );

  return await response.json();
};

export { loginRequest, logoutRequest, verifyRequest };
