import sectionBlueGradationBackground from '@/assets/images/landing/section4/sectionBlueGradationBackground.png';
import { Box } from '@mui/material';

function Section4() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: 'calc(100% + 56px)',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundImage: `url(${sectionBlueGradationBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
        </Box>
    );
}

export default Section4;
