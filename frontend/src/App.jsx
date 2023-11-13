/* eslint-disable no-undef */
import { Spinner } from '@material-tailwind/react';
import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import RouteGenerator from './components/RouteGenerator';

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [route, setRoute] = useState({
    location: "",
    interest: ""
  });


  const handleChange = (/**@type React.ChangeEvent<HTMLInputElement>*/e) => {
    const { name, value } = e.target
    setRoute({
      ...route,
      [name]: value
    })
  }

  const clearRouteValues = () => {
    setRoute({
      location: "",
      interest: ""
    })
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ['places']
  });


  useEffect(() => {
    // Check if the Geolocation API is available in the user's browser
    if ('geolocation' in navigator) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;

          // Update the center with the user's location
          setCenter({ lat: latitude, lng: longitude });
          toast.success('Current user location');
        },
        function (error) {
          // Handle any errors that occur during geolocation retrieval
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error('request for Geolocation denied.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('The request to get user location timed out.');
              break;
            default:
              toast.error('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      toast.error('Geolocation is not available in this browser.');
    }
  }, []);

  if (!isLoaded || center === null) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Spinner className='h-16 w-16 text-gray-900/50' />
      </div>
    );
  }
  return (
    <>
      <div className='h-screen relative flex flex-col'>
        <RouteGenerator route={route} clearRouteValues={clearRouteValues} handleChange={handleChange} center={center} map={map} />
        <GoogleMap
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={(map) => setMap(map)}
        >
          {center && <div>
            <MarkerF position={center} />
          </div>}
        </GoogleMap>
      </div>
      <Toaster />
    </>
  );
}

export default App;
