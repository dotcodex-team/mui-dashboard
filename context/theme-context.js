import { createContext,useState,useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import getTheme from '../theme';
import Cookies from 'js-cookie'
import Global from '@constants/Global'

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}){
    const [themeColor,setThemeColor] = useState('');

    useEffect(()=>{
        let initialColor = Global.colors[0].replace('#','');
        let themeColor = Cookies.get('userTheme');
        if(themeColor){
            initialColor = themeColor;
        }
        setThemeColor(initialColor);
    },[])

    const changeThemeColor = (color)=>{
        Cookies.set('userTheme',color.hex.replace('#',''),{
            domain : process.env.isProd ? process.env.cookieDomain : 'localhost'
        })
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