import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import BootstrapSidebar from './Sidebar/BootstrapSidebar'

export const Landing = () => {
  return (
    <div className="w-100 d-flex" style={{ overflow: "hidden" }}>
      <div>
        <BootstrapSidebar></BootstrapSidebar>
      </div>
      <div className="w-100">
        <Header />
        <div className="welcome_div pb-3 pt-1 mt-2  ms-5 d-flex justify-content-between w-100">
          <span className="welcome_text ms-1">Dashboard</span>
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default Landing;
