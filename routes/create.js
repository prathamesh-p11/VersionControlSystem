/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Create-Repo Command
 */

const fs = require('fs');
const router = require('express').Router();
const { checkIn, getRepoInfo } = require('../utils/router_utils');

router.route('/').post((req, res) => {
  const { state } = req.body;

  checkIn('create', state);

  const repos = fs.readdirSync('.repo');
  const repoInfo = getRepoInfo(state.repo);

  res.json({ repos, repoInfo });
});

module.exports = router;
