/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: RadioBtn component
 */

import React, { Fragment, memo } from 'react';

const RadioBtn = memo(function RadioBtn(props) {
  const { options = [], checked, name, onChange } = props;

  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <div className="radio-btns">
      {options.map(opt => {
        const id = `radio_${opt}`;
        return (
          <Fragment key={id}>
            <input
              type="radio"
              id={id}
              checked={opt === checked}
              name={name}
              value={opt}
              onChange={handleChange}
            />
            <label htmlFor={id}>{opt}</label>
          </Fragment>
        );
      })}
    </div>
  );
});

export default RadioBtn;
