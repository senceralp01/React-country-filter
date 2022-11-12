import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Table from "./components/Table";
import Search from "./components/Search";
import Loading from "./components/Loading";
import Info from "./components/Info";

function App() {

  // *********************************** STATE & VARIABLE MANAGEMENT ***********************************

  // Datas:
  const [data, setData] = useState([]); // Tüm ülkelerin tüm bilgilerini içeren JSON data içindir.
  const [contentData, setContentData] = useState([]); // isim, başkent gibi content'lere göre filtreleme işlemi içindir.

  // Toggles:
  const [toggle, setToggle] = useState(true); // Hangi data setinin table komponentine props içinde gönderileceğini switch etmek içindir.
  const [toggleTable, setToggleTable] = useState(false); // Header dahil tabloyu dinamik olarak render etmek içindir.
  const [loading, setLoading] = useState(true); // Loading komponentini API erişimi ile ilişkili olarak render etmek içindir.

  // Keywords:
  const [capital, setCapital] = useState(""); // Soldaki input içerisine yazılan ifadeyi saklayan state.
  const [keyword, setKeyword] = useState(""); // Soldaki input içerisine yazılan ifadeyi saklayan state.

  // Info message:
  const [info, setInfo] = useState("Loading..."); // Hata mesajları da dahil olmak üzere bilgilendirme mesajını saklayan state.

  // contents: Gelen JSON data içerisinde yer alan key değerlerinden bazılarıdır.
  // Tablo üzerinde yer alan ülke ismi, başkent ve bölge bilgilerine ek olarak "nativeName" ve "numericCode" key'lerine karşılık gelen value'lerle de sağdaki input içerisinden filtreleme yapılabilir.
  const contents = ["name", "capital", "region", "nativeName", "numericCode"];

  

  // ********************************* LIFECYCLE METHODS AND DEPENDENCIES **********************************

  // Bu useEffect'te dependency değeri girilmediği için komponent mount olduğunda içerisindeki işlenmler gerçekleştirilir.
  // Axios aracılığıyla ilgili http request gerçekleştirilir.
  // Gelen JSON bilgisi "data" içerisine set edilir.
  // Gelen JSON bilgisi aynı zamanda content'e göre filtreleme kullanılması için "contentData" içerisine set edilir.
  // Başlangıçta true olan "loading" false yapılır ve Loading komponenti DOM üzerinden kaldırılır.
  // Başlangıçta false olan "toggleTable" true yapılır ve Table komponenti render edilir.
  useEffect(() => {
    axios.get(`https://restcountries.com/v2/all`).then((res) => {
      setData(res.data);
      setContentData(res.data);
      setLoading(false);
      setToggleTable(true);
    });
  }, []);

  // "capital" dependency değerinin bağlı olduğu useEffect içerisindeki işlemler "capital" değeri her değiştiğinde gerçekleştirilir.
  // input'a bir değer girilmezse tüm ülkeler gösterilir.
  // Başkentlerin içerisinde geçen herhangi bir string ifade(örn. "A") ya da ifade grubu ("Ankar", "kar", "ankara") mevcut ise ilgili ülke ya da ülkeleri listeler.
  // Mevcut değilse -404 not found- hata mesajı yakalanır.  Döndürülen hata mesajı info değerine atanır.
  useEffect(() => {
    if (capital === "") {
      axios.get(`https://restcountries.com/v2/all`).then((res) => {
        setToggleTable(true);
        setData(res.data);
      });
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

  // content'e göre filtreleme yapılan sağdaki input'a girilen "keyword" dependency değerine göre çalışan lifecycle metodu.
  // Aşağıda yer alan some metodu içerisinde content array'i içerisinde yer alan key değerlerine göre filtreleme gerçekleştirilir.
  // İlgili ülkeye ait ilgili content key değerinin karşılığı olan value, girilen keyword'u içeriyorsa true döndürülür.
  // true döndüren ülkeler filter metodu ile array olarak döndürülür ve "contentData" o array ile set edilir.
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

  // content'e göre filtrelemede bir sonuç bulunamazsa gerçekleşecek olan işlemler.
  useEffect(() => {
    if (keyword !== "" && !contentData.length) {
      setInfo("Not found in the content");
      setToggleTable(false);
    }
  }, [contentData]);



  // ********************************* RENDERING COMPONENTS **********************************

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
