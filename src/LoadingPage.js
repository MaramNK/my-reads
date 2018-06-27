import React from 'react';
import ReactLoading from 'react-loading';
 
const LoadingPage = ({ balls, ffffff }) => (
    <ReactLoading className="balls" type={balls} color={ffffff} height={100} width={100} />
);
 
export default LoadingPage;