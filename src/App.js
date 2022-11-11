import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState([]);
  const [capital, setCapital] = useState("");
  const [toggle, setToggle] = useState(true);
  const [contentData, setContentData] = useState([]);

  const contents = ["name", "capital", "region"];
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/all`).then((res) => {
      setData(res.data);
      setContentData(res.data);
    });
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
    setContentData(
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
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md input-group mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by capital"
              onChange={(e) => {
                setCapital(e.target.value.toLowerCase());
                setToggle(true);
              }}
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
                setToggle(false);
              }}
            />
          </div>
        </div>
      </div>

      <Table data={toggle ? data : contentData} />
    </div>
  );
}

export default App;
