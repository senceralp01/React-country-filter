import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Navbar from "./Navbar";
import Search from "./Search";

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
      <Navbar />
      <Search
        setCapital={setCapital}
        setKeyword={setKeyword}
        setData={setData}
      />
      <Table data={data} />
    </div>
  );
}

export default App;
