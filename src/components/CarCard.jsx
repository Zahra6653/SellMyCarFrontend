import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  InventoryAction,
  InventorySearchAction,
} from "../redux/InventoryCars/InventoryAction";
import { useDispatch, useSelector } from "react-redux";
import AlertComponent from "./AlertComponent";

const CarCard = ({ car, setIsDelete, carId }) => {
  const [formData, setFormData] = useState({
    modelName: car.modelName,
    description: car.description,
    odometerKMs: car.odometerKMs,
    accidentsReported: car.accidentsReported,
    previousBuyers: car.previousBuyers,
    registrationPlace: car.registrationPlace,
    image: car.image,
    color: car.color,
    majorScratches: car.majorScratches,
    originalPaint: car.originalPaint,
    model: car.model._id,
  });
  const [isEdited, setIsEdited] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const inventoryCars = useSelector(
    (state) => state.inventoryCars.inventoryCars
  );
  const [alert, showAlert] = useState(false);

  const handleProfilePictureChange = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "qandaizb");
    data.append("cloud_name", "divpq1r3o");
    fetch("https://api.cloudinary.com/v1_1/divpq1r3o/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsEdited(true);
        setFormData({ ...formData, image: data.url.toString() });
      });
  };

  const handleInputChange = (e) => {
    console.log(formData);
    if (
      e.target.name === "majorScratches" ||
      e.target.name === "originalPaint"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setIsEdited(true);
  };

  const handleEditChanges = () => {
    showAlert(false);
    axios
      .put(`${base_url}/api/v1/inventory/updateCar/${car._id}`, formData)
      .then((res) => {
        dispatch(InventoryAction(res.data.updatedCar));
        dispatch(InventorySearchAction(res.data.updatedCar));
        localStorage.setItem("myCarsData", JSON.stringify(res.data.updatedCar));
        setMessage("Car details Updated Sucesfully");
        showAlert(true);
      })
      .catch((err) => console.log(err));
    setIsEdited(false);
  };

  const deleteHandler = () => {
    showAlert(false);
    setIsDelete(true);
    axios
      .delete(`${base_url}/api/v1/inventory/deleteUser/${car._id}`)
      .then((res) => {
        const newInventoryCars = inventoryCars.filter(
          (inv_car) => inv_car._id !== car._id
        );
        dispatch(InventoryAction(newInventoryCars));
        dispatch(InventorySearchAction(newInventoryCars));
        localStorage.setItem("myCarsData", JSON.stringify(newInventoryCars));
        setMessage("Car deleted Sucesfully");
        showAlert(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={{ mb: 2 }}>
      {alert && (
        <AlertComponent title="Success" duration={2000} message={message} />
      )}
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2, p: 5, backgroundColor: "#f5f5f5" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              height: "auto",
            }}
          >
            <img
              src={formData.image}
              alt={car.modelName}
              width="100%"
              height="auto"
            />
            <label htmlFor="profile-picture-upload">
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (!e.target.files[0]) return;
                  handleProfilePictureChange(e.target.files[0]);
                }}
              />

              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  top: "15%",
                  left: "90%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "white",
                }}
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>

          <Grid
            item
            sx={{
              mt: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              disabled={!isEdited}
              onClick={handleEditChanges}
              sx={{
                width: "10vw",
                backgroundColor: isEdited ? "#58c7c2" : undefined,
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={deleteHandler}
              sx={{ width: "10vw", bgcolor: "#58c7c2", color: "#FFF" }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h4" sx={{ color: "#567189" }}>
              {car.modelName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Description"
              multiline
              fullWidth
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              InputProps={{
                sx: { color: "#567189" },
              }}
              sx={{ mt: 3 }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: "16px" }}
            >
              <Grid item xs={6} md={4} lg={3}>
                <TextField
                  label="Kms on Odometer"
                  name="odometerKMs"
                  InputProps={{
                    sx: { color: "#567189" },
                  }}
                  value={formData.odometerKMs}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <TextField
                  label="Number of accidents Reported"
                  value={formData.accidentsReported}
                  name="accidentsReported"
                  InputProps={{
                    sx: { color: "#567189" },
                  }}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <TextField
                  label="Number of Previous Buyers"
                  name="previousBuyers"
                  value={formData.previousBuyers}
                  InputProps={{
                    sx: { color: "#567189" },
                  }}
                  onChange={(e) =>
                    setFormData({ ...formData, previousBuyers: e.target.value })
                  }
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <TextField
                  label="Place of registration"
                  name="registrationPlace"
                  InputProps={{
                    sx: { color: "#567189" },
                  }}
                  value={formData.registrationPlace}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              sx={{ marginTop: "16px" }}
            >
              <Grid item auto>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.originalPaint}
                      name="originalPaint"
                      onChange={handleInputChange}
                    />
                  }
                  sx={{ color: "#567189", mt: 2 }}
                  label="Original Paint"
                />
              </Grid>
              <Grid item auto>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.majorScratches}
                      name="majorScratches"
                      onChange={handleInputChange}
                    />
                  }
                  sx={{ color: "#567189", mt: 2 }}
                  label="Major Scratches"
                />
              </Grid>
              <Grid item auto>
                <TextField
                  select
                  label="Color"
                  fullWidth
                  size="small"
                  value={formData.color}
                  name="color"
                  InputProps={{
                    sx: { color: "#567189" },
                  }}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                >
                  {car.model.colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarCard;
