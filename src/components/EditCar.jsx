import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

function EditCar(props) {
  const [open, setOpen] = useState(false);
  console.log(props.data);
  const [car, setCar] = useState({
    brand: props.data.row.brand,
    model: props.data.row.model,
    color: props.data.row.color,

    year: props.data.row.year,

    price: props.data.row.price,
  });

  // Open the modal form

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal form

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({
      ...car,

      [event.target.name]: event.target.value,
    });
  };

  // Update car and close modal form

  const handleSave = () => {
    props.edit(props.data.row._links.self.href, car);
    handleClose();
  };

  return (
    <div>
      <button onClick={handleClickOpen}>Edit</button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit car</DialogTitle>

        <DialogContent>
          <input
            placeholder="Brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
          />
          <br />

          <input
            placeholder="Model"
            name="model"
            value={car.model}
            onChange={handleChange}
          />
          <br />

          <input
            placeholder="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
          />
          <br />

          <input
            placeholder="Year"
            name="year"
            value={car.year}
            onChange={handleChange}
          />
          <br />

          <input
            placeholder="Price"
            name="price"
            value={car.price}
            onChange={handleChange}
          />
          <br />
        </DialogContent>

        <DialogActions>
          <button onClick={handleClose}> Cancel</button>

          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCar;
