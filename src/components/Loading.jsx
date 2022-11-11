import React from 'react';
import { images } from '../constants';

const Loading = () => {
  return (
    <div className='d-flex justify-content-center'>
      <img src={images.loading} alt="loading" style={{ width:"50px", height:"50px" }}/>
    </div>
  )
}

export default Loading