import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#8bf6ff",
            main: "#64b5f6",
            contrastText: '#000000',
        },
        secondary: {
            main: "#ffee58"
        },
        background: {
            default: '#eeeeee',
        },
    },
    status: {
        danger: 'orange',
    },

});