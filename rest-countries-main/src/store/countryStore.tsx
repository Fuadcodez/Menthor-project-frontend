import {create} from 'zustand'
import { Country } from '../countries/country';
interface countryStore {
    countries: Country[];
    setCountries: (country: Country[]) => void;  
    
}

 const useCountryStore = create<countryStore>((set) =>({
    countries: [],
    setCountries: (country:Country[]) => set({countries: country}),
    
}))

export default useCountryStore;