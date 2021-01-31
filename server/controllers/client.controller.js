import { createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { getUserByCookies } from '../helpers/auth.helper';
import App from '../components/app';
import theme from '../../client/theme';
import Template from '../../template';

const render = async (req, res) => {
  const context = {};
  const sheets = new ServerStyleSheets();
  const user = await getUserByCookies(req.cookies);
  const app = createElement(
    App,
    {
      context,
      theme,
      url: req.url,
      user,
    },
  );
  const markup = ReactDOMServer.renderToString(
    sheets.collect(app),
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
