import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

function App() {
  const [data, setData] = useState([]);
  const [capital, setCapital] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/all`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (capital !== "") {
      axios
        .get(`https://restcountries.com/v2/capital/${capital}`)
        .then((res) => setData(res.data));
    }
  }, [capital]);

  return (
    <div className="app">
      <div className="input-group m-3 w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Search by country"
          onChange={(e) => setCapital(e.target.value.toLowerCase())}
        />
      </div>
      <Table data={data} />
    </div>
  );
}

export default App;
