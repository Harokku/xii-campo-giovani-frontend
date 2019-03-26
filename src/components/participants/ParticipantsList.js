import React, {useState, useEffect} from 'react';
import './ParticipantsList.scss';
import axios from 'axios';
import ParticipantBrief from "./ParticipantBrief";

const ParticipantsList = () => {
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

  return (
    <section className="section">
      <div className="tile is-ancestor" style={{"flexWrap": "wrap"}}>
        {participants.map(participant => (
          <div key={participant._id} className="tile is-parent is-4">
            <div className="tile is-child">
              <ParticipantBrief
                id={participant._id}
                displayName={`${participant.surname} ${participant.name}`}
                dob={participant.dob}
                isPresent={participant.isPresent}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ParticipantsList