import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{fontFamily:'Raleway', mt:'7%'}}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Playlister
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}