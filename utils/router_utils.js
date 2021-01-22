const path = require('path');
const { createManifestObj } = require('./manifest_utils');
const { getRepoPath, getFilePathInDir } = require('./path_utils');
const { traverseFolder, readJson, writeJson } = require('./file_utils');

// check in function
const checkIn = (cmd, state) => {
  const manifestObj = createManifestObj(cmd, state);
  const { name, repo, src } = manifestObj;
  traverseFolder(repo, src, manifestObj);

  // save manifest
  const manifestPath = path.join(repo, name);
  writeJson(manifestPath, manifestObj);
};

// list manifest info of a repo
const getRepoInfo = repo => {
  const repoPath = getRepoPath(repo);
  const labelPath = getFilePathInDir(repoPath, 'label');
  const logPath = getFilePathInDir(repoPath, 'log');

  let labels = readJson(labelPath) || {};

  const log = readJson(logPath);

  let manifests = [];
  if (log) {
    manifests = Object.values(log).map(({ name, time }) => {
      return { name, time };
    });
  }

  return { labels, manifests };
};

module.exports = {
  checkIn,
  getRepoInfo,
};
