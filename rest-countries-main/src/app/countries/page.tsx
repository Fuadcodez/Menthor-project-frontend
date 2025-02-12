"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/src/components/ui/select"

import AllCountries from '@/src/components/AllCountries';
import { ClipLoader, PulseLoader } from "react-spinners";
import useCountryStore from '@/src/store/countryStore';

const Countries = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const countries = useCountryStore(state=>state.countries)
  const setCountries = useCountryStore(state=>  state.setCountries)
  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })
  useEffect(()=>{
    const call = async () => {
      setLoading(false)
      try {
        setLoading(true)
        const data = await fetch(`/data.json`)
        const result = await data.json()
        if(!data.ok) throw new Error
        setCountries(result)
       setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        
      }
    }
    call()
  },[])
  return (
    <div className='flex flex-col gap-8 px-5 py-4'>
      <div className='flex flex-col gap-10'>
        <label htmlFor="country" className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)] flex items-center gap-6 py-5 pl-7 rounded-md'>
        <CiSearch size={25} />
        <input type="text" placeholder='Search for a country' id='country' className='flex-1 bg-transparent outline-none'/>
        </label>
        <SelectRoot collection={frameworks} size="sm" width="280px">
      <SelectTrigger className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)]  py-3 px-5  rounded-md'>
        <SelectValueText placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)]  p-3  rounded-md mt-2.5 -translate-x-[20px] w-[280px] shadow-none'>
        {[...new Set(countries.map(country=>country.region))].map((country, index) => (
          <SelectItem item={country} key={index}>
            {country}
          </SelectItem>
        ))}
      </SelectContent>
        </SelectRoot>
      </div>
      {loading ? (<div className='flex items-center justify-center h-full pt-16'><ClipLoader color="#36d7b7" size={100} className='' /></div>):<div className='flex flex-col justify-center gap-6 px-10'>
        {countries?.map(country =>{
          return <AllCountries country={country} key={country.name}/>
        })}
      </div>}
      
    </div>
  )
}

export default Countries