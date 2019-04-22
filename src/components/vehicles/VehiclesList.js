import React, {useState, useEffect} from 'react'
import './VehiclesList.scss'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import StatusSelector from "./StatusSelector";

const VehiclesList = () => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";

  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    async function getVehicles() {
      try {
        const response = await axios.get(`${remoteURL}/vechicles`,
          {
            headers: {
              'Accept': '*/*',
              'Authorization': JSON.parse(localStorage.getItem(localStorageName))
            }
          })
        setVehicles(response.data.data)
      } catch (e) {
        console.error(e)
      }
    }

    getVehicles()
  }, []);

  return (
    <section className="section">

      <div className="level">
        <div className="level-item">
          <StatusSelector
            onStatusChange={setFilterStatus}
          />
        </div>
      </div>

    </section>
  )
}

export default VehiclesList