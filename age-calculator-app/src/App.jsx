import { useState } from 'react'
import img1 from './assets/images/icon-arrow.svg'
import './App.css'

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState({years: '--', months: '--', days: '--'})
  const [ageError, setAgeError]= useState({dayError: '', monthError: '', yearError: '', outdatedError: ''},)


  const calculateAge = ()=>{
    const parseDay =  parseInt(day, 10)
    const parseMonth =  parseInt(month, 10)
    const parseYear =  parseInt(year, 10)
    const fields = [{key:'dayError', value: day, },{key:'monthError', value: month}, {key: 'yearError', value: year}, {key: "outdatedError"}]
    const today = new Date()
    const birthdayTime = new Date(parseYear, parseMonth-1, parseDay)
    const diff = today - birthdayTime

    let getAge = true
    const errors = {}; 
    fields.forEach((field)=>{
      const {key, value} = field
      if(value?.trim() === ""){
        errors[key] = `This is required`;
        getAge = false
      }
      else if (key === 'dayError') {
      const daysInMonth = new Date(parseYear || 0, parseMonth || 0, 0).getDate();
      if (parseInt(day, 10) < 1 || parseInt(day, 10) > daysInMonth) {
        errors[key] = `Must be a valid date`;
        getAge = false
      }
    }
      else if(key === 'monthError'){
        if(parseMonth > 12 || parseMonth<1){
          errors[key] = `must be a valid month`
          getAge = false
        }
      }else if (key === 'yearError'){
        const currentYear = new Date().getFullYear()
        if (parseYear < 1900 || parseYear > currentYear){
         errors[key] = `Year must be between 1900 and ${currentYear}`;
         getAge = false
        }
      }else if (key === "outdatedError"){
        if (diff < 0){
        errors[key] = `You are not born yet, get out of your illusion!!!`;
        getAge= false
      }
      }
      else{
        setAgeError({dayError: '', monthError: '', yearError: '', outdatedError:''})
      }
    })
     
    if (getAge){
      console.log(today.getFullYear())
      console.log(birthdayTime.getFullYear())
      console.log(today.getFullYear()- birthdayTime.getFullYear())
      const todayDate = new Date().getDate()
      const todayMonth = new Date().getMonth()
      const ageDate = new Date(diff);  
      const calculatedAge = Math.abs( todayDate-parseDay === -1 && todayMonth === parseMonth- 1? ((ageDate.getUTCFullYear() -1 ) - 1970):(ageDate.getUTCFullYear() - 1970));
      let calculatedMonths = today.getMonth() - birthdayTime.getMonth();
      console.log(today.getMonth(), birthdayTime.getMonth())
      if (calculatedMonths < 0) {
        calculatedMonths += 12;
      }
      let calculatedDays = today.getDate() - birthdayTime.getDate();
      if (calculatedDays < 0) {
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); 
        console.log(prevMonth, today.getMonth())
        calculatedDays += prevMonth.getDate();
        calculatedMonths--;
        if (calculatedMonths < 0) {
          calculatedMonths += 12; 
        }
      }
      setAge({years: calculatedAge, months: calculatedMonths, days: calculatedDays})
      
    }
    setAgeError(errors);
  }
  return (
    <main className='bg-white py-10 px-6 rounded-lg rounded-br-[6rem] border flex flex-col gap-5 w-[400px] max-w-[500px]'>

      <div>
      <form className='grid grid-cols-3'>
        <div className="flex flex-col justify-center gap-1 text-lg">
          <label htmlFor='day'>Day</label>
          <div className='flex flex-col'>
          <input 
          type="number" 
          className='font-bold w-[100px] border-[hsl(0,1%,44%)] border rounded-sm py-1 px-3 focus:border-blue-400 outline-none' 
          name='day'
          value={day}
          onChange={(e)=>setDay(e.target.value)}
          />
          <span className='text-red-500 text-sm h-5 font-bold'>{ageError.dayError}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 text-lg">
          <label htmlFor='month'>Month</label>
          <div  className='flex flex-col'>
          <input  
          type="number" 
          className='font-bold w-[100px] border-[hsl(0,1%,44%)] border rounded-sm py-1 px-3 focus:border-blue-400 outline-none' 
          name='month'
          value={month}
          onChange={(e)=>setMonth(e.target.value)}/>
          <span className='text-red-500 text-sm h-5 font-bold'>{ageError.monthError}</span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 text-lg">
          <label htmlFor='year'>Year</label>
          <div  className='flex flex-col'>
          <input 
          type="number" 
          className='font-bold w-[100px] border-[hsl(0,1%,44%)] border rounded-sm py-1 px-3 focus:border-blue-400 outline-none' 
          name='year'
          value={year}
          onChange={(e)=>setYear(e.target.value)}
          onBlur={calculateAge}
          />
          <span className='text-red-500 text-sm h-5 font-bold'>{ageError.yearError}</span>
          </div>
        </div>
      </form>
       <p className='text-red-500 text-sm font-bold'>{ageError.outdatedError}</p>

      </div>
      <div className='flex items-center'>
        <div className='bg-[hsl(0,0%,94%)] h-[2px] w-full'>
        </div>
        <div className='w-[80px] h-[50px] rounded-full bg-[hsl(259,100%,65%)] flex justify-center items-center p-3 '>
          <img src={img1} alt="icon-arrrow" />
        </div>
        <div className='bg-[hsl(0,0%,94%)] h-[1px] w-full'>
        </div>
      </div>
      <div>
        <div>
          <h1 className='text-6xl font-bold '><span className='text-[hsl(259,100%,65%)] mr-1'>{age.years}</span>{age.years < 1 ?"year":"years"}</h1>
        </div>
        <div>
          <h1 className='text-6xl font-bold '><span className='text-[hsl(259,100%,65%)] mr-1'>{age.months}</span>{age.months < 1 ?"month":"months"}</h1>
        </div>
        <div>
          <h1 className='text-6xl font-bold '><span className='text-[hsl(259,100%,65%)] mr-1'>{age.days}</span>{age.days <1? "day": "days"}</h1>
        </div>
      </div>
    </main>
  )
}

export default App
