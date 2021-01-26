const create = async (user) => {
  try {
    const response = await fetch(
      '/api/users/',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const list = async (token, signal) => {
  try {
    const response = await fetch(
      '/api/users/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        signal,
      },
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const read = async (userId, token, signal) => {
  try {
    const response = await fetch(
      `/api/users/${userId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
        signal,
      },
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const remove = async (userId, token) => {
  try {
    const response = await fetch(
      `/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      },
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

const update = async (userId, token, user) => {
  try {
    const response = await fetch(
      `/api/users/${userId}`,
      {
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
      },
    );

    return await response.json();
  } catch (err) {
    return { error: 'Error has occurred. Please try again or contact for support.' };
  }
};

export {
  create,
  list,
  read,
  remove,
  update,
};
