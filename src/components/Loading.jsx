import React from 'react';
import { RotatingLines } from 'react-loader-spinner';


const Loading = () => {
  return (
    <div style={{ height: "60vh", }} className="d-flex justify-content-center align-items-center">
      <p>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#bb1f2a"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </p>
    </div>
  );
};

export default Loading;
