const Table = ({ data }) => {
  return (
    <table className="table table-dark table-hover table-striped">
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
            <th scope="row">{index+1}</th>
            <td>{country.name}</td>
            <td>{country.capital}</td>
            <td>{country.region}</td>
            <td>
              <img
                src={country.flags.svg}
                alt={country.name}
                style={{ width: "50px", height: "30px" }}
                className="img-fluid"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
