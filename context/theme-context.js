import { createContext,useState,useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import getTheme from '../theme';
import Cookies from 'js-cookie'

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}){
    const [themeColor,setThemeColor] = useState('');

    useEffect(()=>{
        setThemeColor(Cookies.get('userTheme'))
    },[])

    const changeThemeColor = (color)=>{
        Cookies.set('userTheme',color.hex.replace('#',''),{domain : 'localhost'})
        setThemeColor(color.hex.replace('#',''))
    }
    return (
        <ThemeContext.Provider value={{changeThemeColor,themeColor}}>
            <ThemeProvider
            theme={getTheme(themeColor)}
            >
            <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}