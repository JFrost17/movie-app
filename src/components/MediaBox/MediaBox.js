import React, {useEffect,useState} from 'react'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import {img_300, unavailable} from "../../config/config";
import './MediaBox.css';
import axios from 'axios';
import { Button } from '@mui/material';
import MediaModal from '../Modal/Modal';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 15,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const MediaBox = ({id,poster,title,date,media_type,vote_average}) => {
  const [video,setVideo]=useState();
      
        const fetchVideo = async () => {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
          );
          if(data.results[0]!==undefined){
          setVideo(data.results[0].key);
          }
          else
          {
            setVideo('/')
          }
        };

        useEffect(() => {
          fetchVideo();
          // eslint-disable-next-line
        }, []);

  let color = 'default';
  if(vote_average>=7)
  {
    color = 'success';
  }
  else if( vote_average<7 && vote_average>=5)
  {
    color = 'warning';
  }
  else
  {
    color = 'error';
  }
  return (  
  <MediaModal media_type={media_type} id={id} video={video}> 
    
    <span className='subTitle'>
        {media_type==='tv'?"TV Series":"Movie"}
        <span className='subTitle'>
            {date}
        </span>
    </span>

    <img className='poster' src={poster? `${img_300}/${poster}` : unavailable} alt={title}/>
    
    <b className='title'>{title}</b>
    
    <StyledBadge badgeContent = {Math.round(vote_average * 10) / 10} color={color} anchorOrigin={{vertical: 'top',horizontal: 'right',}}>
      <StarIcon />
    </StyledBadge>
    <div className = 'rating'></div>
            <Button onClick="alert('C') event.stopPropagation;" variant="contained" color="secondary" target="__blank" href={`https://www.youtube.com/watch?v=${video}`}>
            Watch Trailer
            </Button>
  </MediaModal>
  )
}

export default MediaBox
