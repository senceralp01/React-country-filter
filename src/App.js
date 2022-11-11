import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

function App() {
  const [data, setData] = useState([]);
  const [capital, setCapital] = useState("");

  const contents = ["name", "capital", "region"];
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/all`)
      .then((res) => setData(res.data));
  }, []);

  useEffect(() => {
    if (capital === "") {
      axios
        .get(`https://restcountries.com/v2/all`)
        .then((res) => setData(res.data));
    } else {
      axios
        .get(`https://restcountries.com/v2/capital/${capital}`)
        .then((res) => setData(res.data));
    }
  }, [capital]);

  useEffect(() => {
    setData(
      data.filter((country) =>
        contents.some(
          (content) =>
            country[content] && country[content].toLowerCase().includes(keyword)
        )
      )
    );
  }, [keyword]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md input-group mt-5 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by capital"
              onChange={(e) => setCapital(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-md input-group mt-5 mb-3">
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
      <Table data={data} />
    </div>
  );
}

export default App;
