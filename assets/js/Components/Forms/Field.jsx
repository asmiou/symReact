import React from 'react';

const Field = ({id, name, label, type="text", value, placeholder="", onChange, error=""}) =>{
    return (<>
      <div className="form-group">
          <label htmlFor={name}>{label||name}</label>
          <input
              value={value}
              type={type}
              onChange={onChange}
              placeholder={placeholder||label}
              name={name}
              id={id||name}
              label={label}
              className={"form-control "+(error && "is-invalid")}
          />
          {error && <p className="invalid-feedBack text-danger">{error}</p>}
      </div>
    </>);
};

export default Field;
