const fs = require('fs');
const path = require('path');

// check the path exists and is folder.
const isDir = dir => {
  return fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
};

// create new directory if not exists.
const mkDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const readJson = filePath => {
  let jsonData;
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');
    jsonData = JSON.parse(rawData);
  }

  return jsonData;
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// get artifaceId of the file
const getArtifactId = filePath => {
  const WEIGHTS = [1, 3, 7, 11, 13];
  const MODULUS = Math.pow(2, 31) - 1;
  const content = fs.readFileSync(filePath, 'utf8');
  const len = content.length;
  let sum = 0;
  for (let i = 0; i < len; i += 1) {
    sum += WEIGHTS[i % 5] * content.charCodeAt(i);
    sum %= MODULUS;
  }

  return `${sum}-L${len}${path.extname(filePath)}`;
};

const decorateFileName = (filePath, append) => {
  if (append === undefined) return filePath;

  return path.join(
    path.dirname(filePath),
    `${path.parse(filePath).name}_${append}${path.extname(filePath)}`
  );
};

// copy files from src to dest
const copyFiles = (files, src, dest, append) => {
  Object.entries(files).forEach(([file, artifactId]) => {
    const srcPath = path.join(src, file, artifactId);
    const destPath = path.join(dest, decorateFileName(file, append));
    const dirPath = path.dirname(destPath);
    mkDir(dirPath);
    fs.copyFileSync(srcPath, destPath);
  });
};

const removeFiles = dest => {
  if (isDir(dest)) {
    const files = fs.readdirSync(dest);
    for (let i = 0; i < files.length; i += 1) {
      const curPath = path.join(dest, files[i]);
      if (isDir(curPath)) {
        removeFiles(curPath);
      } else if (files[i] !== '.branch.txt') {
        fs.unlinkSync(curPath);
      }
    }
  }
};

// save file with artifactId
const save2Repo = (dest, src, manifestObj) => {
  const destDir = path.join(dest, path.basename(src));
  mkDir(destDir);
  const artifactId = getArtifactId(src);
  const savePath = path.join(destDir, artifactId);

  if (!fs.existsSync(savePath)) {
    fs.copyFileSync(src, savePath);
  }

  const fileName = path.relative(manifestObj.repo, destDir);
  manifestObj.files[fileName] = artifactId;
};

// traverse Folder to save files
const traverseFolder = (dest, src, manifestObj) => {
  const destPath = path.join(dest, path.basename(src));

  if (isDir(src)) {
    const files = fs.readdirSync(src);
    for (let i = 0; i < files.length; i += 1) {
      const curPath = path.join(src, files[i]);
      if (isDir(curPath)) {
        traverseFolder(destPath, curPath, manifestObj);
      } else if (path.basename(curPath) !== '.branch.txt') {
        save2Repo(destPath, curPath, manifestObj);
      }
    }
  }
};

module.exports = {
  copyFiles,
  decorateFileName,
  getArtifactId,
  isDir,
  mkDir,
  readJson,
  removeFiles,
  save2Repo,
  traverseFolder,
  writeJson,
};
