const app = require('./app');

const port = app.get('port');

app.listen(port, () => {
  console.log(`Server is running on port: ${port}, and ready to accept requests`);
});
