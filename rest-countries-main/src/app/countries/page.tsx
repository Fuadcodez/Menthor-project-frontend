"use client"
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/src/components/ui/select"

import AllCountries from '@/src/components/AllCountries';
import { ClipLoader, } from "react-spinners";
import useCountryStore from '@/src/store/countryStore';
import { Country } from './country';

const Countries = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const countries = useCountryStore(state=>state.countries)
  const setCountries = useCountryStore(state=>  state.setCountries)
  const [filterCountries, setFilterCountries] = useState<Country[]>([])
  const [category, setCategory] = useState< string[]>([])
  const [region, setRegion] = useState<string>('')
  const [input, setInput] = useState<string>('')

   const frameworks = createListCollection({
    items: category
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w =e.target.value
     setInput(w)
      const trimInput = w.trim().toLowerCase()
      const newFilter = countries.filter(country => country.name.toLowerCase().includes(trimInput))
     setFilterCountries(newFilter)
  }
  useEffect(()=>{
    const fil = countries?.filter((country)=>{
      if(region === '') return true
      if(region) {
        return country.region === region
      }
    })
   setFilterCountries(fil)
  },[region, countries])
  useEffect(()=>{
    const call = async () => {
      setLoading(false)
      try {
        setLoading(true)
        const data = await fetch(`/data.json`)
        const result = await data.json()
        if(!data.ok) throw new Error
        setCountries(result)
        const f = [...new Set(result.map((country: Country)=>country.region))] as string[]
          setCategory(f)
        console.log(f)
       setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        
      }
    }
    call()
  },[setCountries])
  return (
    <div className='flex flex-col gap-8 px-5 py-4'>
      <div className='flex flex-col gap-10 md:flex-row md:justify-between md:items-center'>
        <label htmlFor="country" className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)] flex items-center gap-6 py-5 pl-7 rounded-md lg:w-[350px] xl:w-[450px] shadow-md shadow-black/50'>
        <CiSearch size={25} />
        <input type="text" placeholder='Search for a country' id='country' value={input} onChange={handleChange} className='flex-1 bg-transparent outline-none'/>
        </label>
        <SelectRoot collection={frameworks} size="sm" width="280px">
      <SelectTrigger className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)]  py-3 px-5  rounded-md shadow-black/50 shadow-md'>
        <SelectValueText placeholder="Filter by Region" />
      </SelectTrigger>
      <SelectContent className='text-[hsl(200,15%,8%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] dark:text-[hsl(0,0%,100%)]  p-3  rounded-md mt-2.5 -translate-x-[20px] w-[280px] shadow-none'>
        {frameworks.items.map((region) => (
          <SelectItem item={region} key={region} onClick={()=>setRegion(region)}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
        </SelectRoot>
      </div>
      {loading ? (<div className='flex items-center justify-center h-full pt-16'><ClipLoader color="#36d7b7" size={100} className='' /></div>):<div className='grid grid-cols-1 gap-8 px-10 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 sm:px-0 xl:grid-cols-4'>
        {filterCountries?.map(country =>{
          return <AllCountries country={country} key={country.name}/>
        })}
      </div>}
      
    </div>
  )
}

export default Countries