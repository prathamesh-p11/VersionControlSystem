const path = require('path');

const getRepoPath = repo => path.join('.repo', repo);

const getFilePathInDir = (dir, file) => {
  let fileName = file;

  switch (file) {
    case 'branch':
      fileName = '.branch.txt';
      break;
    case 'header':
      fileName = 'header.json';
      break;
    case 'log':
      fileName = 'manifest_log.json';
      break;
    case 'label':
      fileName = 'label.json';
      break;
    default:
      break;
  }
  return path.join(dir, fileName);
};

module.exports = {
  getRepoPath,
  getFilePathInDir,
};
