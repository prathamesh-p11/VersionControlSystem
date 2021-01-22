/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Col3
 */

import React from 'react';
import { connect } from 'react-redux';

const formatTime = time => {
  const date = new Date(Number(time));
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return date.toLocaleDateString('en-US', options);
};

function Col3({ items }) {
  const { labels, manifests = [] } = items || {};

  return (
    <div className="list">
      Manifest List
      {manifests.map(({ name, time }) => {
        const date = formatTime(time);
        const label = Object.keys(labels).find(key => labels[key] === name);

        const className = label ? 'label' : 'manifest';

        return (
          <div key={time} className={className}>
            <span className="span-name">{name}</span>
            <span className="span-label">{label}</span>
            <span className="span-time">{date}</span>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = ({ snapshots }, { focused }) => {
  return {
    items: snapshots[focused],
  };
};

export default connect(mapStateToProps)(Col3);
