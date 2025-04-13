import {createTheme , responsiveFontSizes} from '@mui/material'

export const theme = createTheme({
    palette: {

        light: {
            main: '#fff',

        },
        dark: {
            main: '#212121',
            text: '#fff',
        },
    },
    typography: {
        fontSize:{
            heading: 'clamp(0.5rem, 2.5vw, 1.3rem)',
            subText : 'clamp(0.5rem, 2.5vw, 1rem)',
        }
    }
});
