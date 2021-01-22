/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Col2
 */

import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchInfo } from 'actions';

function Col2(props) {
  const { repos, focused, setFocused, fetchInfo } = props;

  const handleSelect = e => {
    const val = e.target.getAttribute('value');
    setFocused(val);
  };

  useEffect(() => {
    axios.post('/fetch_data').then(res => {
      if (res.status === 200) {
        const { repos } = res.data;
        const focused = repos.length ? repos[0] : '';
        setFocused(focused);
        fetchInfo(res.data);
      }
    });
  }, [fetchInfo, setFocused]);

  return (
    <div id="col2" className="list">
      Repo List
      {repos.map(repo => {
        const className = repo === focused ? 'focused' : null;
        return (
          <div
            key={repo}
            className={className}
            value={repo}
            onClick={handleSelect}
          >
            {repo}
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = ({ repos }) => {
  return { repos };
};

const actionCreators = { fetchInfo };

export default connect(mapStateToProps, actionCreators)(Col2);
