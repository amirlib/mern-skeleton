import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import Template from '../../template';
import MainRouter from '../../client/routers/MainRouter';
import theme from '../../client/theme';

const render = (req, res) => {
  const context = {};
  const sheets = new ServerStyleSheets();
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter
        context={context}
        location={req.url}
      >
        <ThemeProvider theme={theme}>
          <MainRouter />
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
