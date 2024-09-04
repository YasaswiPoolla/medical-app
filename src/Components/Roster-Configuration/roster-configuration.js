import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TimeSlotsLists from '../TimeSlots/time-slots-lists';
import FlootLists from '../Floor/floor-lists';
import StationLists from '../Station/station-lists';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import BootstrapSidebar from '../Sidebar/BootstrapSidebar';

const RosterConfiguration = () => {

    const [key, setKey] = useState('Time Slot');

    return (
      <>
        <div className="d-flex">
          <div className="me-2">
            <BootstrapSidebar />
          </div>
          <div className="tableBackground ms-5">
            <div className=''>
              <Header />
            </div>
            <div className="">
              <div className="headerOne border d-flex justify-content-between align-items-center p-4">
                <span className="titleHeader">Roster Configuration</span>
              </div>
              
              <div className="p-1 ms-3">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                  style={{
                    border: 0,
                    height: 40,
                  }}
                >
                  <Tab eventKey="Time Slot" title={<span>Time Slot</span>}>
                    <TimeSlotsLists />
                  </Tab>
                  <Tab eventKey="floor" title={<span>Floor</span>}>
                    <FlootLists />
                  </Tab>
                  <Tab eventKey="station" title={<span>Station</span>}>
                    <StationLists />
                  </Tab>
                </Tabs>
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
}

export default RosterConfiguration;