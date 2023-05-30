import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Link,
  Popover,
  Paper,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@mui/material";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import { base_url } from "../utils/base_url";
import carBack from "../images/carBack.png";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { spacing } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InventoryAction,
  InventorySearchAction,
} from "../redux/InventoryCars/InventoryAction";

const DealerForm = () => {
  const user = useSelector((state) => state.user.user);
  const inventoryCars = useSelector(
    (state) => state.inventoryCars.inventoryCars
  );
  const [colors, setColors] = useState([]);
  const [oemCarNames, setOemCarNames] = useState([]);
  const [specs, setSpecs] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const [carSpecs, setCarSpecs] = useState({});
  const [imageFile, setImageFile] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    modelName: "",
    image: "",
    description: "",
    odometerKMs: "",
    accidentsReported: "",
    previousBuyers: "",
    registrationPlace: "",
    color: "",
    majorScratches: false,
    originalPaint: true,
    model: "",
  });

  useEffect(() => {
    setFormData({ ...formData, postedBy: user._id });
    axios
      .get(`${base_url}/api/v1/inventory/allModelsByNameAndYear`)
      .then((res) => {
        setOemCarNames(res.data.cars);
      })
      .catch((err) => console.log(err));
  }, []);

  const specHandler = (e) => {
    const value = e.target.value;
    if (value !== "") {
      const input = value.split(" ");
      const name = input.slice(0, -1).join(" ");
      const year = input[input.length - 1];

      setFormData({ ...formData, modelName: value });
      axios
        .get(
          `${base_url}/api/v1/inventory/getCarSpecsByNameYear/${name}/${year}`
        )
        .then((res) => {
          setFormData({
            ...formData,
            modelName: value,
            model: res.data.car[0]._id,
          });
          setColors(res.data.car[0].colors);
          setCarSpecs(res.data.car[0]);
          setSpecs(true);
        })
        .catch((err) => console.log(err));
    }
  };

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
        console.log(data);
        setFormData({ ...formData, image: data.url.toString() });
      });
  };
  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setIsPopoverOpen(false);
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${base_url}/api/v1/inventory/postCars`, formData)
      .then((res) => {
        setSpecs(false);
        inventoryCars.push(formData);
        console.log(res.data.car)
        dispatch(InventoryAction(inventoryCars));
        dispatch(InventorySearchAction(inventoryCars));
        localStorage.setItem("myCarsData", JSON.stringify(res.data.car));
        navigate("/", { state: true });
      });
  };

  return (
    <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.8)" }}>
      <Navbar isMain={false} />
      <Box
        sx={{
          display: "flex",
          mt: 2,
          justifyContent: "flex-end",
          background: `url(${carBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        <Box
          sx={{
            ml: 10,
            mb: 2,
            p: 2,
            borderRadius: "10px",
            maxWidth: 500,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            background: "white",
            marginRight: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#567189", textAlign: "center" }}
          >
            Fill the Car Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              label="Model Name"
              value={formData.modelName}
              onChange={specHandler}
              fullWidth
              margin="normal"
              required
            >
              {oemCarNames.map((car, index) => (
                <MenuItem
                  key={index}
                  value={`${car.modelName} ${car.yearOfModel}`}
                >
                  {car.modelName} {car.yearOfModel}
                </MenuItem>
              ))}
            </TextField>
            {specs && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handlePopoverOpen}
                  sx={{ cursor: "pointer", color: "blue" }}
                >
                  OEM Specifications
                </Link>
              </Box>
            )}
            <FormControl>
              <FormHelperText>
                <label htmlFor="image-upload">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (!e.target.files[0]) {
                        return;
                      }
                      setImageFile(e.target.files[0]);
                      handleProfilePictureChange(e.target.files[0]);
                    }}
                    required
                  />
                  <Button
                    variant="contained"
                    component="span"
                    endIcon={<AttachFileIcon />}
                    sx={{
                      bgcolor: "#58c7c2",
                      "&:hover": {
                        bgcolor: "#449b98",
                      },
                    }}
                  >
                    {imageFile ? imageFile.name : "Upload Image of the Car"}
                  </Button>
                </label>
              </FormHelperText>
            </FormControl>

            <TextField
              label="Model Description"
              value={formData.description}
              name="description"
              onChange={inputChangeHandler}
              multiline
              rows={5}
              fullWidth
              margin="normal"
              required
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.majorScratches}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        majorScratches: e.target.checked,
                      })
                    }
                  />
                }
                sx={{ color: "#567189" }}
                label="Major Scratches"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.originalPaint}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPaint: e.target.checked,
                      })
                    }
                  />
                }
                sx={{ color: "#567189" }}
                label="Original Paint"
              />
              {specs && (
                <TextField
                  select
                  label="Select Color"
                  value={formData.color}
                  name="color"
                  sx={{ marginLeft: 5 }}
                  fullWidth
                  onChange={inputChangeHandler}
                  margin="normal"
                  required
                >
                  <MenuItem value="" disabled>
                    Select Color
                  </MenuItem>
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="KMs on Odometer"
                value={formData.odometerKMs}
                name="odometerKMs"
                onChange={inputChangeHandler}
                type="number"
                sx={{ mr: 2 }}
                fullWidth
                required
              />
              <TextField
                label="Registration Place"
                value={formData.registrationPlace}
                onChange={inputChangeHandler}
                name="registrationPlace"
                fullWidth
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Number of Accidents Reported"
                value={formData.accidentsReported}
                name="accidentsReported"
                onChange={inputChangeHandler}
                type="number"
                sx={{ mr: 2 }}
                fullWidth
                required
              />
              <TextField
                label="Number of Previous Buyers"
                value={formData.previousBuyers}
                name="previousBuyers"
                onChange={inputChangeHandler}
                type="number"
                fullWidth
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#58c7c2",
                "&:hover": {
                  bgcolor: "#449b98",
                },
              }}
              fullWidth
            >
              Register Car
            </Button>
          </form>
        </Box>
      </Box>
      <Popover
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 5, bgcolor: "#58c7c2", textAlign: "center" }}>
          <Paper
            sx={{
              p: 3,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#359e99",
            }}
          >
            <Typography variant="body1" gutterBottom>
              <strong>Model Name:</strong> {carSpecs.modelName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Year of Model:</strong> {carSpecs.yearOfModel}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Price of New Model:</strong> {carSpecs.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Colors Available:</strong> {carSpecs?.colors?.join(", ")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Mileage:</strong> {carSpecs.mileage}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Power:</strong> {carSpecs.power}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Max Speed:</strong> {carSpecs.maxSpeed} Kmph
            </Typography>
          </Paper>
        </Box>
      </Popover>
      <Footer />
    </Box>
  );
};

export default DealerForm;
