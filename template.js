const template = ({ markup, css }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MERN Skeleton</title>
    </head>
    <body>
      <div id="root">${markup}</div>
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript" src="/dist/bundle.js"></script>
    </body>
  </html>
`;

export default template;
