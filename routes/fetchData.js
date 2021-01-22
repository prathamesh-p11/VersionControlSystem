/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: get how many repos in repo folder
 */

const router = require('express').Router();
const fs = require('fs');
const { getRepoInfo } = require('../utils/router_utils');

router.route('/').post((_, res) => {
  const repos = fs.readdirSync('.repo');

  const snapshots = {};

  repos.forEach(repo => {
    snapshots[repo] = getRepoInfo(repo);
  });

  res.json({ repos, snapshots });
});

module.exports = router;
