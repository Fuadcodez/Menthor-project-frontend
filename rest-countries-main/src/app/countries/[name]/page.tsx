"use client"
import React, {use, useEffect, useState} from 'react'
import useCountryStore from '@/src/store/countryStore'
import { Country } from '../country'
import { ClipLoader } from 'react-spinners'
import SingleCountry from '@/src/components/SingleCountry'
import Link from 'next/link'
import { MdKeyboardBackspace } from "react-icons/md";
const page =  ({params}: { params: Promise<{ name: string }> }) => {
  const [loading, setLoading] = useState(false)
  const singleCountry = useCountryStore(state=>state.singleCountry)
  const setSingleCountry = useCountryStore(state=>state.setSingleCountry)
      const { name } = use(params);
     const decode = decodeURIComponent(name)
      
  useEffect(() =>{
    const call = async () => {
      setLoading(false)
      try {
        setLoading(true)
        const data = await fetch('/data.json')
        const res = await data.json()
        if(!data.ok) throw new Error
        const country = res.find((country: Country) => country.name=== decode)
        console.log(country)
        console.log(decode)
        setSingleCountry([country])
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    call()
    
  }, [])

  return (
    <div className='dark:bg-[hsl(207,26%,17%)] bg-[hsl(0,0%,90%)] dark:text-[hsl(0,0%,100%)] text-[hsl(200,15%,8%)] relative min-h-[100svh] overflow-hidden p-10 '>
      <div className='flex flex-col gap-16 '>
      <div className='flex justify-start'>
      <Link href="/" className='flex items-center justify-center gap-3 px-8 py-2 text-[hsl(200,15%,8%)] dark:text-[hsl(0,0%,100%)] dark:bg-[hsl(209,23%,22%)] bg-[hsl(0,0%,100%)] rounded-md shadow-md shadow-black/50'><MdKeyboardBackspace size={25}/>Back</Link>
      </div>
      {loading? (<div className='flex items-center justify-center h-full pt-16'><ClipLoader color="#36d7b7" size={100} className='' /></div>):<div >
        {singleCountry?.map((country , index)=>{
          return <SingleCountry country={country} key={index}/>
        })}
      </div>}

      </div>
    </div>
  )
}

export default page