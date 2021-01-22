/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Check-In
 */

const router = require('express').Router();
const { checkIn, getRepoInfo } = require('../utils/router_utils');

router.route('/').post((req, res) => {
  const { state } = req.body;
  checkIn('checkin', state);

  const repoInfo = getRepoInfo(state.repo);
  res.json({ repoInfo });
});

module.exports = router;
