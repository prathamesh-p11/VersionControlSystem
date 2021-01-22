/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: redux reducer
 */

import { actionTypes } from '../actions';

const reposReducer = (repos, action) => {
  if (action.type === actionTypes.FETCH_REPOS) {
    return action.repos;
  }

  return repos;
};

const snapshotsReducer = (snapshots, action) => {
  if (action.type === actionTypes.FETCH_SNAPSHOTS) {
    return {
      ...snapshots,
      [action.repo]: action.snapshots,
    };
  }

  return snapshots;
};

const rootReducer = ({ repos, snapshots }, action) => {
  if (action.type === actionTypes.FETCH_INFO) {
    return {
      repos: action.repos,
      snapshots: action.snapshots,
    };
  }

  return {
    repos: reposReducer(repos, action),
    snapshots: snapshotsReducer(snapshots, action),
  };
};

export default rootReducer;
