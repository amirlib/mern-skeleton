import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { get } from '../../auth/auth-helper';
import { AuthProvider } from '../../contexts/auth.context';
import MainRouter from '../../routers/MainRouter';
import theme from '../../theme';

const App = () => {
  const data = get();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider userProp={data.user ? data.user : {}}>
          <MainRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(App);
