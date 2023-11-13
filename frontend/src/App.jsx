/* eslint-disable no-undef */
import { Spinner } from '@material-tailwind/react';
import { useJsApiLoader, GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import RouteGenerator from './components/RouteGenerator';

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

  const [center, setCenter] = useState(null);
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')
  const [map, setMap] = useState(/** @type google.maps.Map */(null))

  /**@type React.MutableRefObject<HTMLInputElement> */
  const locationRef = useRef()
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()

  const [directionResponse, setDirectionResponse] = useState(null)



  const calculateRoute = async () => {
    if (locationRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: locationRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)

  }



  const clearRouteValues = () => {
    locationRef.current.value = ''
    destinationRef.current.value = ''
    setDistance('')
    setDuration('')
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
        <RouteGenerator calculateRoute={calculateRoute} duration={duration} distance={distance} locationRef={locationRef} destinationRef={destinationRef} clearRouteValues={clearRouteValues} center={center} map={map} />
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
          {center && <MarkerF position={center} />}
          {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        </GoogleMap>
      </div>
      <Toaster />
    </>
  );
}

export default App;
