import React from 'react'
import { Country } from '../app/countries/country'

const SingleCountry = ({country}: {country: Country}) => {
  const name = country?.name
  const nativeName = country?.nativeName
  const population = country?.population
  const region = country?.region
  const subregion = country?.subregion
  const capital = country?.capital
  const flag = country?.flag
  const currencies = country?.currencies
  const languages = country?.languages
  const borders = country?.borders
  const domain = country?.topLevelDomain[0]
  return (
    <div className='flex flex-col gap-10 lg:flex-row lg:items-center max-lg:justify-center lg:gap-20'>
      <div className=''>
        <img src={flag} alt="National flag" className='object-cover w-full h-full rounded-t-md'/>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-10 lg:flex-row lg:items-center'>
      <div className='flex flex-col justify-center gap-3'>
        <h1 className='mb-4 text-3xl font-bold'>{name}</h1>
        <h2>Native Name: {nativeName}</h2>
        <h2>Population: {population?.toLocaleString()}</h2>
        <h2>Region: {region}</h2>
        <h2>Sub Region: {subregion}</h2>
        <h2>Capital: {capital}</h2>
      </div>
      <div className='flex flex-col justify-center gap-3'>
        <h2>Top Level Domain: {domain}</h2>
        <div className='flex items-center gap-1'>
        <h2>Currencies:</h2>
        <div className='flex items-center'>
        {currencies?.map((currency)=>currency.name).join(' , ')}
        </div>
        </div>
        <div className='flex items-center gap-1'>
        <h2>Languages:</h2>
        <div className='flex items-center'>
        {languages?.map((language)=>language.name).join(', ')}
        </div>
        </div>
      </div>
      </div>
      <div className='flex flex-col gap-3 max-lg:justify-center lg:flex-row lg:gap-10'>
        <h2 className='text-xl  lg:text-[1rem] lg:w-[40%]'>Border Countries:</h2>
        <div className='flex flex-wrap items-center gap-2'>
        {borders?.map((border) => <button key={border} className='px-12 py-2 text-[hsl(200,15%,8%)] dark:text-[hsl(0,0%,100%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] rounded-md shadow-md shadow-black/50' >{border}</button>)}
        </div>
      </div>
      </div>
    </div>
  )
}

export default SingleCountry