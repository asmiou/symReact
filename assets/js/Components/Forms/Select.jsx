import React from 'react';

const Select = ({name, label="", value, onChange, error="", children}) =>{
    return (<>
      <div className="form-group">
          <label htmlFor={name}>{label||name}</label>
          <select
              className={"custom-select form-control select2 "+(error && "is-invalid")}
              id={name}
              name={name}
              onChange={onChange}
              value={value}
              error={error}
          >
              {children}
          </select>
          {error && <p className="invalid-feedBack text-danger">{error}</p>}
      </div>
    </>);
};

export default Select;
