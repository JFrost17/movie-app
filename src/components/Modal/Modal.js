import React, {useEffect,useState} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import {img_500,unavailable} from "../../config/config";
import './Modal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: '#0f1042',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'white',
  p: 4,
};

export default function MediaModal({children, media_type, id,video}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      
      <div  className='media' onClick={handleOpen}>
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <Box sx={style}>
                {content && (
                    <div className="MediaModal">
                        <img 
                             src={ content.poster_path ? `${img_500}/${content.poster_path}`: unavailable}
                              alt={content.name || content.title}
                             className="MediaModal__poster"
                        />
                        <div className="MediaModal__text">
                            <span className="MediaModal__title">
                                 {content.name || content.title} (
                                 {(
                                content.first_air_date ||
                                content.release_date ||
                                "-----"
                                ).substring(0, 4)}
                                )
                            </span>

                            <span className="MediaModal__description">
                                {content.overview}
                            </span>

                        </div>
                    </div>
                )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}