/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Merge-in Command
 */

const router = require('express').Router();
const { readJson } = require('../utils/file_utils');
const { checkIn, getRepoInfo } = require('../utils/router_utils');
const { getRepoPath, getFilePathInDir } = require('../utils/path_utils');
const { getManifestName } = require('../utils/manifest_utils');

const mergeIn = state => {
  const { repo, mt, mr } = state;

  const repoPath = getRepoPath(repo);
  const mtName = getManifestName(repo, mt);
  const mrName = getManifestName(repo, mr);

  const mtObj = readJson(getFilePathInDir(repoPath, mtName));
  const mrObj = readJson(getFilePathInDir(repoPath, mrName));

  state.mt = mtObj.index;
  state.mr = mrObj.index;

  checkIn('merge-in', state);
};

router.route('/').post((req, res) => {
  const { state } = req.body;

  mergeIn(state);

  const repoInfo = getRepoInfo(state.repo);
  res.json({ repoInfo });
});

module.exports = router;
