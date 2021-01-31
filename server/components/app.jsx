import React from 'react';
import { StaticRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from '../../client/contexts/auth.context';
import MainRouter from '../../client/routers/MainRouter';

const App = (props) => {
  const {
    context,
    req,
    theme,
    user,
  } = props;

  return (
    <StaticRouter
      context={context}
      location={req.url}
    >
      <ThemeProvider theme={theme}>
        <AuthProvider userProp={user}>
          <MainRouter />
        </AuthProvider>
      </ThemeProvider>
    </StaticRouter>
  );
};

App.propTypes = {
  context: PropTypes.shape({}).isRequired,
  req: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  theme: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default App;
