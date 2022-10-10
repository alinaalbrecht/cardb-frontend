import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../constants.js";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

const CarList = (props) => {
  const [cars, setCars] = useState([]);
  const token = sessionStorage.getItem("jwt");
  const fetchCars = () => {
    axios
      .get(SERVER_URL + "api/cars", { headers: { Authorization: token } })
      .then((response) => {
        setCars(response.data._embedded.cars);
      });
  };

  const onDelClick = (url) => {
    axios
      .delete(url, { headers: { Authorization: token } })
      .then(() => fetchCars());
  };

  const onEditClick = (url, car) => {
    axios
      .put(url, car, { headers: { Authorization: token } })
      .then(() => fetchCars());
  };

  const addCar = (car) => {
    axios
      .post(SERVER_URL + "api/cars", car, {
        headers: { "Content-Type": "application/json", Authorization: token },
      })
      .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          fetchCars();
        } else {
          alert("something went wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => fetchCars(), []);

  const columns = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <button onClick={() => onDelClick(row.row._links.self.href)}>
          Delete
        </button>
      ),
    },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (row) => <EditCar data={row} edit={onEditClick} />,
    },
  ];

  return (
    <>
      <button onClick={props.logout}>Logout</button>
      <AddCar addCar={addCar} />
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={cars}
          columns={columns}
          getRowId={(row) => row._links.self.href}
        />
      </div>
    </>
  );
};

export default CarList;
