const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const { getRepoPath, getFilePathInDir } = require('./path_utils');
const { mkDir, readJson, writeJson } = require('./file_utils');

const getManifestName = (repo, manifest) => {
  const repoPath = getRepoPath(repo);
  const labelPath = getFilePathInDir(repoPath, 'label');
  const labels = readJson(labelPath);
  // get manifest name if labeld
  if (labels && labels[manifest]) {
    return labels[manifest];
  }

  return manifest;
};

// set branch file when checkout
const setBranchFile = state => {
  const { dest, src } = state;

  const projectPath = path.join(dest, path.basename(src));
  const branchPath = getFilePathInDir(projectPath, 'branch');

  let branch;

  if (fs.existsSync(branchPath)) {
    branch = fs.readFileSync(branchPath);
    return branch;
  }

  mkDir(projectPath);
  branch = uuid();
  fs.writeFileSync(branchPath, branch);
  return branch;
};

const getParentIndex = (cmd, state, branchHeader, currentIndex) => {
  const { mt, mr, manifest } = state;
  if (cmd === 'merge-in') {
    return [mt, mr];
  }

  if (cmd === 'checkout') {
    const re = /\w+\_(\d+)/.exec(manifest);
    if (re) {
      return [Number(re[1])];
    }
  }

  return branchHeader ? [branchHeader] : [currentIndex];
};

const setChildInLog = (manifestLog, parentIndex, childIndex) => {
  parentIndex.forEach(pi => {
    const { child = [] } = manifestLog[pi];
    manifestLog[pi].child = [...child, childIndex];
  });
};

// create manifest object
const createManifestObj = (cmd, state) => {
  const { repo, src, dest } = state;

  let branch = 'origin';
  let currentIndex;
  let parentIndex;
  let childIndex;

  const repoPath = getRepoPath(repo);
  const logPath = getFilePathInDir(repoPath, 'log');
  const headerPath = getFilePathInDir(repoPath, 'header');
  mkDir(repoPath);

  if (cmd === 'checkout') {
    branch = setBranchFile(state);
  } else {
    const branchPath = getFilePathInDir(src, 'branch');
    if (fs.existsSync(branchPath)) {
      branch = fs.readFileSync(branchPath);
    }
  }

  let header = readJson(headerPath);

  if (header) {
    currentIndex = header.total;
    parentIndex = getParentIndex(cmd, state, header[branch], currentIndex);
  } else {
    header = {};
  }

  const manifestLog = readJson(logPath) || {};

  if (parentIndex === undefined) {
    childIndex = 0;
  } else {
    childIndex = currentIndex + 1;
    setChildInLog(manifestLog, parentIndex, childIndex);
  }

  const time = Date.now();
  const name = `manifest_${childIndex}.json`;
  manifestLog[childIndex] = { name, time };

  header.total = childIndex;
  header[branch] = childIndex;

  writeJson(headerPath, header);
  writeJson(logPath, manifestLog);

  const manifestObj = {
    cmd,
    index: childIndex,
    name,
    repo: repoPath,
    src,
    time,
    files: {},
    parent: parentIndex,
  };

  if (cmd === 'checkout') {
    manifestObj.dest = dest;
  }

  return manifestObj;
};

module.exports = {
  createManifestObj,
  getManifestName,
  setBranchFile,
};
