/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Label Command
 */

const router = require('express').Router();
const { getRepoPath, getFilePathInDir } = require('../utils/path_utils');
const { readJson, writeJson } = require('../utils/file_utils');
const { getRepoInfo } = require('../utils/router_utils');

router.route('/').post((req, res) => {
  const { state } = req.body;
  const { repo, manifest, label } = state;

  const labelPath = getFilePathInDir(getRepoPath(repo), 'label');
  const labels = readJson(labelPath) || {};
  labels[label] = manifest;
  writeJson(labelPath, labels);

  const repoInfo = getRepoInfo(repo);
  res.json({ repoInfo });
});

module.exports = router;
