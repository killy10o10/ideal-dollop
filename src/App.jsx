/* eslint-disable no-undef */
import { Spinner } from '@material-tailwind/react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

  const [center, setCenter] = useState({ lat: 6.6696191, lng: -1.6299929 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    // Check if the Geolocation API is available in the user's browser
    if ("geolocation" in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords

          // Update the center with the user's location
          setCenter({ lat: latitude, lng: longitude });
          toast.success("Access granted")
        },
        function (error) {
          // Handle any errors that occur during geolocation retrieval
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              toast.error("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              toast.error("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              toast.error("The request to get user location timed out.")
              break;
            default:
              console.error("An unknown error occurred.");
              toast.error("An unknown error occurred.")
              break;
          }
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      toast.error("Geolocation is not available in this browser.")
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Spinner className='h-16 w-16 text-gray-900/50' />
      </div>
    );
  }
  return (
    <>
      <div className='h-screen'>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>

        </GoogleMap>
      </div>
      <Toaster />
    </>
  );
}

export default App;

