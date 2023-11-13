/* eslint-disable react/prop-types */
import { Input } from '@material-tailwind/react';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';
import { TbLocationFilled } from 'react-icons/tb';
import { Autocomplete } from '@react-google-maps/api'


/**
 * @typedef {Object} RouteGeneratorProps
 * @property {{ lat: number, lng: number }} center 
 * @property {google.maps.Map | null} map
 * @property {{ location: string, interest: string }} route 
 * @property {function(event: React.ChangeEvent<HTMLInputElement>): void} handleChange
 * @property {function(): void} clearRouteValues  
 */

/**
 * RouteGenerator component.
 * @param {RouteGeneratorProps} props 
 */


function RouteGenerator(props) {
  const { center, map, handleChange, clearRouteValues, route } = props

  return (
    <div className='bg-white self-center justify-self-center absolute top-10 rounded p-4 z-50 flex flex-col gap-6'>
      <div className='flex flex-col md:flex-row gap-3'>
        <Autocomplete>
          <Input
            name='location'
            onChange={handleChange}
            placeholder='Enter Location'
            value={route.location}
            icon={<SlLocationPin />}
          />
        </Autocomplete>
        <Input
          name='interest'
          onChange={handleChange}
          placeholder='Enter interest'
          value={route.interest}
          icon={<CiSearch />}
        />
        <button className='bg-pink-500 rounded-md hover:bg-pink-600 whitespace-nowrap px-5 text-white font-bold active:scale-95 transition-all'>
          Generate Place
        </button>
        <button onClick={clearRouteValues} className='bg-blue-gray-50 hover:bg-gray-300 rounded-lg px-2 flex items-center active:scale-95 transition-all w-fit'>
          <AiOutlineClose className='text-2xl' />
        </button>
      </div>
      <div className='flex items-center justify-between'>
        <p>Distance:</p>
        <p>Duration:</p>
        <button onClick={() => map.panTo(center)} className='bg-blue-gray-50 hover:bg-gray-300 rounded-full border-2 border-blue-500 p-2 flex items-center active:scale-95 transition-all'>
          <TbLocationFilled />
        </button>
      </div>
    </div>
  );
}

export default RouteGenerator;
