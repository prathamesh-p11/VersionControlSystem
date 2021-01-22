/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Check-Out
 */

const router = require('express').Router();
const path = require('path');
const { getRepoInfo } = require('../utils/router_utils');
const { readJson, writeJson, copyFiles } = require('../utils/file_utils');
const { getRepoPath } = require('../utils/path_utils');
const {
  createManifestObj,
  getManifestName,
} = require('../utils/manifest_utils');

const checkOut = state => {
  const { repo, dest } = state;
  const repoPath = getRepoPath(repo);
  const manifest = getManifestName(repo, state.manifest);
  state.manifest = manifest;

  // get files list from checkout manifest
  const checkoutPath = path.join(repoPath, manifest);
  const checkoutManifestObj = readJson(checkoutPath);
  const { src, files } = checkoutManifestObj;

  state.src = path.basename(src);
  const manifestObj = createManifestObj('checkout', state);
  manifestObj.files = files;

  // copy files from repo to dest
  copyFiles(files, repoPath, dest);

  const manifestPath = path.join(repoPath, manifestObj.name);
  writeJson(manifestPath, manifestObj);
};

router.route('/').post((req, res) => {
  const { state } = req.body;

  checkOut(state);
  const repoInfo = getRepoInfo(state.repo);

  res.json({ repoInfo });
});

module.exports = router;
