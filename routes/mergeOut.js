/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Merge-out Command
 */

const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { readJson, decorateFileName } = require('../utils/file_utils');
const { getRepoPath, getFilePathInDir } = require('../utils/path_utils');
const { getManifestName, setBranchFile } = require('../utils/manifest_utils');

// find to lowest common ancestor
const getLCA = (log, node, u, v, lca) => {
  const isSelf = node === u || node === v ? true : false;

  let count = 0;

  if (log[node] && log[node].child) {
    log[node].child.forEach(i => {
      if (getLCA(log, i, u, v, lca)) {
        count += 1;
      }
    });
  }

  if ((isSelf && count === 1) || count === 2) {
    if (lca[0] === -1) {
      lca[0] = node;
    }

    return true;
  }

  return isSelf || count == 1;
};

const mergeOut = state => {
  const { repo, dest, mt, mr } = state;
  const repoPath = getRepoPath(repo);
  const logPath = getFilePathInDir(repoPath, 'log');

  const mtName = getManifestName(repo, mt);
  const mrName = getManifestName(repo, mr);

  const mtPath = getFilePathInDir(repoPath, mtName);
  const mrPath = getFilePathInDir(repoPath, mrName);

  const manifestLog = readJson(logPath);
  const mtObj = readJson(mtPath);
  const mrObj = readJson(mrPath);
  const mg = [-1];

  getLCA(manifestLog, 0, mtObj.index, mrObj.index, mg);

  const [mgIndex] = mg;
  const mgPath = getFilePathInDir(repoPath, `manifest_${mgIndex}.json`);
  const mgObj = readJson(mgPath);

  mtFiles = {};
  mrFiles = {};
  mgFiles = {};

  Object.entries(mrObj.files).forEach(([key, aid]) => {
    if (aid !== mtObj.files[key]) {
      // collision
      const filePath = path.join(dest, key);

      // MR
      const mrFilePath = path.join(mrObj.repo, key, aid);
      fs.copyFileSync(mrFilePath, decorateFileName(filePath, 'MR'));

      // MT
      if (fs.existsSync(filePath)) {
        fs.renameSync(filePath, decorateFileName(filePath, 'MT'));
      }

      // MG
      let mgAid = mgObj.files[key];
      if (mgAid) {
        const mgFilePath = path.join(mrObj.repo, key, mgAid);
        fs.copyFileSync(mgFilePath, decorateFileName(filePath, 'MG'));
      }
    }
  });

  setBranchFile({ dest, src: mtObj.src });
};

router.route('/').post((req, res) => {
  const { state } = req.body;

  mergeOut(state);

  res.sendStatus(200);
});

module.exports = router;
