import React from 'react';

const Search = ({ setCapital, setKeyword, setToggle }) => {
  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Filter with capital.."
          onChange={(e) => {
            setCapital(e.target.value.toLowerCase());
            setToggle(true);
          }}
        />
      </div>
      <div className="col-md mb-2">
        <input
          id="content"
          type="text"
          className="form-control"
          placeholder="Filter with other contents.."
          onChange={(e) => {
            setKeyword(e.target.value.toLowerCase());
            setToggle(false);
          }}
        />
      </div>
    </div>
  </div>
  )
}

export default Search