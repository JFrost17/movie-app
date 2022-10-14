import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MediaBox from '../../components/MediaBox/MediaBox';
import './Trending.css'; 
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
  const [page,setPage] = useState(1);
  const [content,setContent]=useState([]);

  const fetchTrending = async () =>{
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    setContent(data.results);
  };

  useEffect(()=>{
    fetchTrending();
  },[page])

  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
        {
          content && content.map((c)=> (
          <MediaBox
          key={c.id} 
          id={c.id} 
          poster={c.poster_path} 
          title={c.title || c.name} 
          date={c.first_air_date||c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
          video = {c.key}/>))
        }
      </div>
      <CustomPagination setPage={setPage}/>
    </div>
  )
}

export default Trending
