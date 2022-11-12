import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Info from "./components/Info";

function App() {
  // Datas:
  const [data, setData] = useState([]);
  const [contentData, setContentData] = useState([]);

  // Toggles:
  const [toggle, setToggle] = useState(true);
  const [toggleTable, setToggleTable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Keywords:
  const [capital, setCapital] = useState("");
  const [keyword, setKeyword] = useState("");

  // Info message:
  const [info, setInfo] = useState("Loading...");

  const contents = ["name", "capital", "region"];

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/all`).then((res) => {
      setData(res.data);
      setContentData(res.data);
      setLoading(false);
      setToggleTable(true);
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
        .then((res) => {
          setToggleTable(true);
          setData(res.data);
        })
        .catch((error) => {
          setData([]);
          setToggleTable(false);
          setInfo(error.response.data.message);
        });
    }
  }, [capital]);

  useEffect(() => {
    setContentData(
      data.filter((country) =>
        contents.some((content) => {
          setToggleTable(true);
          if (country[content]) {
            return country[content].toLowerCase().includes(keyword);
          }
        })
      )
    );
  }, [keyword]);

  useEffect(() => {
    if (keyword !== "" && !contentData.length) {
      setInfo("Not found in the content");
      setToggleTable(false);
    }
  }, [contentData]);

  return (
    <div>
      <Navbar />
      <Search
        setCapital={setCapital}
        setKeyword={setKeyword}
        setToggle={setToggle}
      />
      {loading && <Loading />}
      {toggleTable && <Table data={toggle ? data : contentData} />}
      {!toggleTable && <Info info={info} />}
    </div>
  );
}

export default App;
