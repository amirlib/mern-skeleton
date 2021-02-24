const setCookie = (name, value, options = {}) => {
  const cookieOptions = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) cookieOptions.expires = cookieOptions.expires.toUTCString();

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const pairs = Object.entries(options);

  pairs.forEach((pair) => {
    updatedCookie += `; ${pair[0]}`;

    if (!pair[1]) updatedCookie += `=${pair[1]}`;
  });

  document.cookie = updatedCookie;
};

const deleteCookie = (name) => {
  setCookie(
    name,
    '',
    {
      'max-age': -1,
      path: '/',
    },
  );
};

const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
    ),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export { deleteCookie, getCookie, setCookie };
