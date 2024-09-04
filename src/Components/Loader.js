import Loader from "react-js-loader";
import React from "react";
 
const LoaderSpinner = () => {
    return (
        <div style={{ height: "100vh", alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Loader type="spinner-default" bgColor={'#03a9f4'} color={'#03a9f4'} size={50} className="d-flex align-items-center" />
        </div>
    )
}
 
export default LoaderSpinner;