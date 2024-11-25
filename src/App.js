import './App.css';
import { ToastContainer } from 'react-toastify';
import { Zoom, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import router from './routes/Routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div>
    <RouterProvider router={router} />
      <Zoom in={showScroll}>
        <Fab
          onClick={scrollToTop}
          sx={{
            margin: '0 auto',
            width: "40px",
            height: "20px",
            position: 'fixed',
            backgroundColor: '#000',
            color: '#fff',
            bottom: {
              xs: 80, sm: 24
            },
            right: 24,
            borderRadius: '0px',
            '&:hover': {
              backgroundColor: '#bb1f2a',
              color: '#fff',
            },
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
      <ToastContainer />
    </div>
  )
}

export default App;
