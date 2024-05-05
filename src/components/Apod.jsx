import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth } from "./firebase"; // Import Firebase authentication module
import { toast } from "react-toastify"; // Import toast 
import { Button } from "@mui/material"; 
import "../styles/Apod.css"; // Import CSS styles

function Apod() {
  // State variables for APOD data and selected date
  const [apodData, setApodData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch APOD data when selected date changes
  useEffect(() => {
    fetchApodData(selectedDate);
  }, [selectedDate]);

  // Function to fetch APOD data from NASA API
  const fetchApodData = async (date) => {
    try {
      // Format date to ISO string
      const formattedDate = date.toISOString().split('T')[0];
      
      // Fetch APOD data from NASA API
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=1BNFKLldlk5aIcpcEzCqeL3qcbdDshYl79Ibtxan&date=${formattedDate}`
      );
      
      // Check if response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      
      // Parse response data
      const data = await response.json();
      setApodData(data); // Set APOD data to state
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      // toast.error("Failed to fetch APOD data"); // Display error toast
    }
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
  };

  // Render Apod component
  return (
    <div className="container">
      <div className="date-picker">
        {/* Date picker component */}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
        {/* Button to fetch APOD data */}
        <Button variant="contained" onClick={() => fetchApodData(selectedDate)}>
          Get APOD
        </Button>
      </div>
      {/* Conditional rendering based on APOD data availability */}
      {apodData ? (
        <div className="apod-container">
          <h3 className="apod-title">Astronomy Picture of the Day</h3>
          {/* Display APOD image */}
          <img className="apod-image" src={apodData.url} alt={apodData.title} />
          <div>
            {/* Display APOD details */}
            <p className="apod-details"><strong>Title:</strong> {apodData.title}</p>
            <p className="apod-details"><strong>Date:</strong> {apodData.date}</p>
            <p className="apod-details">{apodData.explanation}</p>
          </div>
        </div>
      ) : (
        <p>Loading APOD data...</p> // Display loading message if APOD data is not available
      )}
    </div>
  );
}

export default Apod; 
