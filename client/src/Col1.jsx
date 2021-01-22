/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Col1
 */

import React, { memo, useCallback, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchRepos, fetchSnapshots } from 'actions';
import { Input, RadioBtn } from 'components';

const options = [
  'create',
  'checkin',
  'checkout',
  'label',
  'merge-out',
  'merge-in',
];

const fields = {
  create: ['repo', 'src'],
  checkin: ['repo', 'src'],
  checkout: ['repo', 'dest', 'manifest'],
  label: ['repo', 'manifest', 'label'],
  'merge-out': ['repo', 'dest', 'mt', 'mr'],
  'merge-in': ['repo', 'src', 'mt', 'mr'],
};

const Col1 = memo(function Col1(props) {
  const { setFocused, fetchRepos, fetchSnapshots } = props;
  const [cmd, setCmd] = useState('create');
  const [state, setState] = useState({
    repo: '',
    src: '',
    dest: '',
    label: '',
    manifest: '',
    mt: '',
    mr: '',
  });

  const history = useHistory();

  const changeCmd = value => {
    setCmd(value);
    history.replace(`/${value}`);
  };

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    axios.post(`/${cmd}`, { state }).then(res => {
      if (res.status === 200) {
        const { repos, repoInfo } = res.data;
        if (cmd === 'create') {
          fetchRepos(repos);
        }

        if (cmd !== 'merge-out') {
          fetchSnapshots(state.repo, repoInfo);
        }

        setFocused(state.repo);
      }
    });
  };

  let disabled = false;

  return (
    <div>
      <RadioBtn
        name="command"
        options={options}
        checked={cmd}
        onChange={changeCmd}
      />

      <div className="form">
        {fields[cmd].map(field => {
          const value = state[field];
          if (value === '') disabled = true;
          return (
            <Input
              key={field}
              label={field}
              value={value}
              onChange={handleChange}
            />
          );
        })}
      </div>

      <button type="button" disabled={disabled} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
});

const actionCreators = {
  fetchRepos,
  fetchSnapshots,
};

export default connect(null, actionCreators)(Col1);
