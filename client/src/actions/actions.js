/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: redux actions
 */

import actionTypes from './actionTypes';

export const fetchInfo = info => {
  return {
    ...info,
    type: actionTypes.FETCH_INFO,
  };
};

// export const fetchData = ({ repos, snapshots }) => {
//   return {
//     repos,
//     snapshots,
//     type: actionTypes.FETCH_DATA,
//   };
// };

export const fetchRepos = repos => {
  return {
    repos,
    type: actionTypes.FETCH_REPOS,
  };
};

export const fetchSnapshots = (repo, snapshots) => {
  return {
    repo,
    snapshots,
    type: actionTypes.FETCH_SNAPSHOTS,
  };
};
