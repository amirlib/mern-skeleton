import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { getUserByCookies } from '../helpers/auth.helper';
import { AuthProvider } from '../../client/contexts/auth.context';
import MainRouter from '../../client/routers/MainRouter';
import theme from '../../client/theme';
import Template from '../../template';

const render = async (req, res) => {
  console.log('render');
  const context = {};
  const sheets = new ServerStyleSheets();
  const user = await getUserByCookies(req.cookies);
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter
        context={context}
        location={req.url}
      >
        <ThemeProvider theme={theme}>
          <AuthProvider userProp={user}>
            <MainRouter />
          </AuthProvider>
        </ThemeProvider>
      </StaticRouter>,
    ),
  );

  if (context.url) return res.redirect(303, context.url);

  const css = sheets.toString();

  return res.status(200).send(
    Template({
      markup,
      css,
    }),
  );
};

export { render };
