import React, { useState, useEffect } from 'react';
import NavBar from '../navBar/NavBar';
import axios from 'axios';
import '../styles/Home.css'


const Home = () => {
  // State variable to store asteroids data
  const [asteroids, setAsteroids] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []); 

  // Function to fetch asteroid data from NASA API
  const fetchData = async () => {
    try {
      // Fetch data from NASA NEO API
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-05-05&end_date=2024-05-06&api_key=1BNFKLldlk5aIcpcEzCqeL3qcbdDshYl79Ibtxan`);
      // Set asteroid data to state
      setAsteroids(response.data.near_earth_objects['2024-05-05']); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      
      <div className="home-container">
        <h2>Asteroids Near Earth on 2024-05-05</h2>
        <ul>
          {asteroids.map((asteroid, index) => (
            <li key={index}>
              <strong>Name:</strong> {asteroid.name}, <strong>Miss Distance:</strong> {asteroid.close_approach_data[0].miss_distance.kilometers} km
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
