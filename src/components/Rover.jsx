import React, { useState, useEffect } from 'react'; // Import React and  hooks
import axios from 'axios'; // Import Axios
import { Container, Grid, Pagination, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material'; // Import Material-UI components


function App() {
  // State variables for photos, pagination, sol, maxSol, and camera
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1); // Start from page 1
  const [totalPages, setTotalPages] = useState(1);
  const [sol, setSol] = useState('');
  const [maxSol, setMaxSol] = useState(0);
  const [camera, setCamera] = useState('all');

  // Fetch rover data on component mount
  useEffect(() => {
    const fetchRover = async () => {
      try {
        // Fetch rover data from NASA API
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=1BNFKLldlk5aIcpcEzCqeL3qcbdDshYl79Ibtxan`
        );
        // Set maxSol to state
        setMaxSol(response.data.photo_manifest.max_sol);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchRover();
  }, []);

  // Fetch photos data based on page, sol, maxSol, and camera
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let solValue = sol === '' ? 0 : parseInt(sol);
        if (solValue > maxSol) {
          alert('Sol value must be less than or equal to Max Sol value.');
          return;
        }
        let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${solValue}&page=${page}&api_key=1BNFKLldlk5aIcpcEzCqeL3qcbdDshYl79Ibtxan`;
        if (camera !== 'all') {
          apiUrl += `&camera=${camera}`;
        }
        const response = await axios.get(apiUrl);
        setPhotos(response.data.photos); // Set photos data to state
        setTotalPages(Math.ceil(response.data.total_photos / 25)); // Set total pages
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [page, sol, maxSol, camera]);

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Function to handle camera change
  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  
  return (
    <Container>
      {/* Heading */}
      <Typography variant="h3" align="center" gutterBottom>
        Mars Rover Photos
      </Typography>
      {/* Sol value input */}
      <TextField
        label="Enter Sol Value"
        variant="outlined"
        type="number"
        value={sol}
        onChange={(e) => setSol(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      {/* Camera selection dropdown */}
      <FormControl variant="outlined" style={{ marginLeft: '10px' }}>
        <InputLabel id="camera-label">Select Camera</InputLabel>
        <Select
          labelId="camera-label"
          id="camera-select"
          value={camera}
          onChange={handleCameraChange}
          label="Select Camera"
        >
          {/* Camera options */}
          <MenuItem value="all">All Cameras</MenuItem>
          <MenuItem value="FHAZ">Front Hazard Avoidance Camera (FHAZ)</MenuItem>
          <MenuItem value="RHAZ">Rear Hazard Avoidance Camera (RHAZ)</MenuItem>
          <MenuItem value="MAST">Mast Camera (MAST)</MenuItem>
          <MenuItem value="CHEMCAM">Chemistry and Camera Complex (CHEMCAM)</MenuItem>
          <MenuItem value="MAHLI">Mars Hand Lens Imager (MAHLI)</MenuItem>
          <MenuItem value="MARDI">Mars Descent Imager (MARDI)</MenuItem>
          <MenuItem value="NAVCAM">Navigation Camera (NAVCAM)</MenuItem>
          <MenuItem value="PANCAM">Panoramic Camera (PANCAM)</MenuItem>
          <MenuItem value="MINITES">Miniature Thermal Emission Spectrometer (MINITES)</MenuItem>
        </Select>
      </FormControl>
      {/* Grid container for displaying photos */}
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid key={photo.id} item xs={12} sm={6} md={4} lg={3}>
            {/* Display photo */}
            <img
              src={photo.img_src}
              alt={`Mars Rover Photo - ${photo.id}`}
              style={{ width: '100%', height: 'auto' }}
              onError={(e) => {
                e.target.src = 'placeholder_image_url'; // Placeholder image URL in case of error
              }}
            />
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </Container>
  );
}

export default App; 
