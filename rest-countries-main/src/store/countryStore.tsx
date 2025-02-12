import {create} from 'zustand'
import { Country } from '../app/countries/country';
interface countryStore {
    countries: Country[];
    setCountries: (country: Country[]) => void; 
    singleCountry: Country[]
    setSingleCountry: (country: Country[]) => void
    
}

 const useCountryStore = create<countryStore>((set) =>({
    countries: [],
    setCountries: (country:Country[]) => set({countries: country}),
    singleCountry: [],
    setSingleCountry: (country:Country[]) => set({singleCountry: country}),
    
}))

export default useCountryStore;