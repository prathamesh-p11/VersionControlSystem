/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: helper function of artifact id, copy files to the directory.
 */

const path = require("path");
const fs = require("fs");

/**
 * get artifact id
 * @param {string} src
 * @returns {string}
 */
function getArtifactId(filePath) {
  const WEIGHTS = [1, 3, 7, 11, 13];
  const MODULUS = Math.pow(2, 31) - 1;
  const content = fs.readFileSync(filePath, "utf8");
  const len = content.length;
  let sum = 0;
  for (let i = 0; i < len; i += 1) {
    sum += WEIGHTS[i % 5] * content.charCodeAt(i);
    sum %= MODULUS;
  }

  return `${sum}-L${len}${path.extname(filePath)}`;
}

/**
 * is directory
 * @param {string} dir
 * @returns {boolean}
 */
function isDir(dir) {
  return fs.lstatSync(dir).isDirectory();
}

/**
 * ensure directory exists, if not, mkdir
 * @param {string} dir
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    const absolutePath = path.join(__dirname, dir);
    fs.mkdirSync(absolutePath, { recursive: true });
  }
}

/**
 * stash file
 * @param {string} src
 * @param {string} dest
 */
function stashFile(src, dest, manifest) {
  const destDir = path.join(dest, path.basename(src));
  ensureDir(destDir);
  const arifactId = getArtifactId(src);
  const filePath = path.join(destDir, arifactId);

  // if file not exists, copy with arifactId name
  // skip stash file if already exists.
  if (!fs.existsSync(filePath)) {
    fs.copyFileSync(src, filePath);
  }

  const relative = path.relative(path.dirname(manifest), destDir);
  fs.appendFileSync(manifest, `${relative} ${arifactId}\n`);
}

/**
 * stash directory
 * @param {string} src
 * @param {string} dest
 * @param {string} manifest
 */
function stashDir(src, dest, manifest) {
  const destDir = path.join(dest, path.basename(src));
  if (isDir(src)) {
    const files = fs.readdirSync(src);
    for (let i = 0; i < files.length; i += 1) {
      const curDir = path.join(src, files[i]);
      if (isDir(curDir)) {
        stashDir(curDir, destDir, manifest);
      } else {
        stashFile(curDir, destDir, manifest);
      }
    }
  }
}

/**
 * @param {string} cmd
 */
function stash(cmd) {
  let [, src, dest] = cmd.split(" ");
  const destDir = path.join(dest, path.basename(src));
  ensureDir(destDir);
  const manifest = path.join(dest, "manifest.txt");
  const time = Date(Date.now()).toString();
  fs.appendFileSync(manifest, `${cmd}\n${time}\n`);
  stashDir(src, dest, manifest);
}

module.exports = stash;
