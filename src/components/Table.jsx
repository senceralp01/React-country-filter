import React from "react";

const Table = ({ data }) => {
  return (
    <div className="table-responsive-sm">
      <table className="table table-dark table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {data.map((country, index) => (
            <tr key={country.alpha3Code}>
              <th scope="row">{index + 1}</th>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
              <td>
                <img
                  src={country.flags.svg}
                  alt={`${country.name}-flag`}
                  style={{ width: "50px", height: "auto" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
