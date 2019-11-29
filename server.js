const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();
const port = 8091;

app.use('/static', express.static(path.resolve(__dirname, './build/static')));
app.use('/', express.static(path.resolve(__dirname, './build')));

router.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, './build/index.html')));
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
