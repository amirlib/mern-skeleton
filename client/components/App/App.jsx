import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { getJwt } from '../../auth/auth-helper';
import { AuthProvider } from '../../contexts/auth.context';
import MainRouter from '../../routers/MainRouter';
import theme from '../../theme';

const App = () => {
  const jwt = getJwt();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider userProp={jwt.user ? jwt.user : {}}>
          <MainRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(App);
