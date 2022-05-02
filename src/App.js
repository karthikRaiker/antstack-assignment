import "./App.css";
import Table from "./components/Table";
import React, { useState, useReducer, useEffect } from "react";
import Filter from "./components/Filter";

const initialState = {
  pincode: "",
  date: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FILTERPIN":
      return { ...state, pincode: action.value };
    case "FILTERDATE":
      return { ...state, date: action.value };
    default:
      return state;
  }
};

function App() {
  const [heading, setHeading] = useState([]);
  const [tabledata, setTabledata] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [file, setFile] = useState(false);
  const [currentFilter, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    handleFilter(currentFilter.pincode, currentFilter.date);
  }, [currentFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target[0].files[0];
    if (input) {
      setFile(true);
      const reader = new FileReader();

      reader.onload = function (e) {
        const text = e.target.result;

        const data = csvToArray(text);
        const uniqueArray = [...new Set(data)];
        setTabledata(uniqueArray);
        setFilterData(uniqueArray);
      };

      reader.readAsText(input);
    } else {
      setFile(false);
    }
  };

  const csvToArray = (str, delimiter = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    setHeading(headers);

    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    for (let i = 0; i < arr.length; i++) {
      arr[i]["items"] = arr[i]["items\r"];
      delete arr[i]["items\r"];
      arr[i]["items"] = arr[i]["items"].split(";");
      arr[i]["items"].pop();
    }
    return arr;
  };

  const handleFilter = (pincode = "", dates = new Date()) => {
    let date = dates.split("-").reverse().join("/");

    const filterData =
      tabledata.length &&
      tabledata.filter(
        (item) =>
          item["deliveryPincode"]
            .toString()
            .toLowerCase()
            .indexOf(pincode.toString().toLowerCase()) > -1 &&
          item["orderDate"]
            .toString()
            .toLowerCase()
            .indexOf(date.toString().toLowerCase()) > -1
      );
    handleSort(filterData);
  };

  const handleSort = (filterData) => {
    const filterArr =
      filterData.length &&
      filterData.sort((a, b) => {
        if (a["deliveryPincode"] === b["deliveryPincode"]) {
          return a["orderDate"] - b["orderDate"];
        } else {
          return a["deliveryPincode"] - b["deliveryPincode"];
        }
      });

    setFilterData(filterArr ? filterArr : []);
  };

  return (
    <div className="App">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" className="csvFile" accept=".csv" />
        <input type="submit" value="submit" />
      </form>
      {file ? (
        <div className="Table">
          <div className="Heading">Table</div>
          <Filter handleFilter={handleFilter} dispatch={dispatch} />
          <Table heading={heading} data={filterData} />
        </div>
      ) : (
        <div className="Table">
          <span>Please Choose a File</span>
        </div>
      )}
    </div>
  );
}

export default React.memo(App);
