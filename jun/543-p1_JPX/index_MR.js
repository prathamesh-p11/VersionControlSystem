// manifest_1.json
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  const { cmd } = req.body;
  if (cmd) {
    const [, src] = cmd.split(' ');
    const fs = require('fs');
    if (fs.existsSync(src)) {
      const stash = require('./utils');
      stash(cmd);
    }
  }

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Node server is running...');
});
