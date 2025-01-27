import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
  selectClasses,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const ChekOutMap = ({
  dailog,
  handleCloseDailog,
  onLoad,
  onPlaceChanged,
  address,
  setAddress,
  currentLocation,
  handleDragEnd,
  selectedCountry,
}) => {
  return (
    <Dialog
      disablePortal
      MenuProps={{ disableScrollLock: true }}
      open={dailog}
      onClose={handleCloseDailog}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            bounds: new window.google.maps.LatLngBounds(
              new window.google.maps.LatLng(16.0, 34.5),
              new window.google.maps.LatLng(32.0, 55.0)
            ),
            componentRestrictions: { country: 'AE' },
          }}
        >
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="Enter a location"
            variant="outlined"
            sx={{ width: "90%", marginBottom: 2 }}
          />
        </Autocomplete>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCloseDailog}
          aria-label="close"
          sx={{ position: "absolute", right: "20px", top: "20px" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: "400px", width: "100%" }}>
          <GoogleMap
            center={currentLocation}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={6}
            options={{
              draggable: true,
              scrollwheel: false,
              keyboardShortcuts: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: true,
              streetViewControl: false,
              controlSize: 25,
            }}
          >
            <Marker
              position={currentLocation}
              draggable={true}
              onDragEnd={handleDragEnd}
            />
          </GoogleMap>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChekOutMap;
