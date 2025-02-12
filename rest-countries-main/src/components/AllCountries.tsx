import React from 'react'
import { Country } from '../app/countries/country'
import Link from 'next/link'
const AllCountries = ({country}:{country:Country}) => {
    const {name,population,region,capital }= country
    const {svg}=country?.flags
  return (
    <>
    <div className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)] rounded-md'>
      <Link href={`/countries/${encodeURIComponent(name)}`}>
    <div className='h-[200px] '>
   <img src={svg} alt="National flag" className='object-cover w-full h-full rounded-t-md'/>

    </div>
      </Link>
    <div className='flex flex-col justify-center gap-3 pl-7 py-7'>
    <h2 className='text-xl font-bold'>{name}</h2>
    <div className='flex flex-col gap-1 text-lg'>
    <p>{`Population: ${population?.toLocaleString()}`}</p>
    <p>{`Region: ${region}`}</p>
    <p>{`Capital: ${capital}`}</p>

    </div>

    </div>
     
</div>

     
  
    </>
  )
}

export default AllCountries