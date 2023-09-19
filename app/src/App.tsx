import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [file, setFile] = useState("");
  const [limit, setLimit] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:8080/logs?limit=${limit}&file=${file}&search=${keyword}`
    );
    const { message, data } = await response.json();
    setData(data);
    setMessage(message);
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value);
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h3>{loading ? "loading..." : message}</h3>
      <label>
        File Name
        <input type="text" onChange={handleFileChange} />
      </label>
      <label>
        Number of Lines
        <input type="text" onChange={handleLimitChange} placeholder="defaults to 10"/>
      </label>
      <label>
        Search Keyword
        <input type="text" onChange={handleKeywordChange} />
      </label>
      <button type="button" onClick={fetchData}>
        Fetch
      </button>

      {data && <Table data={data} />}
    </div>
  );
}

export default App;
