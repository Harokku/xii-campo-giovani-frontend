import React, {useState, useEffect} from 'react';
import './ParticipantsStatusList.scss';
import ParticipantStatus from "./ParticipantStatus";
import axios from "axios";

const ParticipantsStatusList = () => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function getParticipants() {
      try {
        const response = await axios.get(`${remoteURL}/participants`, {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        })
        setParticipants(response.data.data)
      } catch (e) {
        console.error(e)
      }
    }

    getParticipants()
  }, [])

  /**
   * Count participant based on presence status.
   *
   * @param {array} list - List of participants to count
   * @param {boolean} isPresent - Indicate if will be counted presents or not
   * @returns {number} - Counted participants
   */
  const countParticipants = (list, isPresent) => (
    list.reduce((count, current) => {
      if (current.isPresent === isPresent) {
        count++;
      }
      return count
    }, 0)
  );

  return (
    <div className="level">
      <div className="level-item">
        <ParticipantStatus
          color='is-info'
          number={countParticipants(participants, true)}
          name='Al campo'
        />
      </div>
      <div className="level-item">
        <strong>Stato partecipanti</strong>
      </div>
      <div className="level-item">
        <ParticipantStatus
          color='is-warning'
          number={countParticipants(participants, false)}
          name='In licenza'
        />
      </div>
    </div>
  )
}

export default ParticipantsStatusList