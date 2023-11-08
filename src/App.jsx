/* eslint-disable no-undef */
import { Spinner } from '@material-tailwind/react';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

function App() {
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_KEY;

  const center = { lat: 5.564889, lng: -0.2618898 }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  console.log(isLoaded)

  if (!isLoaded) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Spinner className='h-16 w-16 text-gray-900/50' />{' '}
      </div>
    );
  }
  return (
    <>
      <div className='h-screen'>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>

        </GoogleMap>
      </div>
    </>
  );
}

export default App;
