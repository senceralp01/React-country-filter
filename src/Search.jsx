import React from 'react';
import axios from "axios";

const Search = ({ setCapital, setKeyword, setData }) => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md input-group mt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by capital"
          onChange={(e) => setCapital(e.target.value.toLowerCase())}
        />
      </div>
      <div className="col-md input-group mt-3 mb-3">
        <input
          id="content"
          type="text"
          className="form-control"
          placeholder="Filter by other contents"
          onChange={(e) => {
            setKeyword(e.target.value.toLowerCase());
          }}
        />
        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            document.getElementById("content").value = "";
            axios
              .get(`https://restcountries.com/v2/all`)
              .then((res) => setData(res.data));
          }}
        >
          Clear
        </button>
      </div>
    </div>
  </div>
  )
}

export default Search