import React, {useState, useEffect} from 'react';
import './ParticipantsList.scss';
import axios from 'axios';
import QrReader from 'react-qr-scanner'
import ParticipantBrief from "./ParticipantBrief";

const ParticipantsList = () => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [isQrReaderOpen, setQrReaderOpen] = useState(false);

  const handleScan = (data) => {
    if (data !== null) {
      console.log(data)
      setQrReaderOpen(false)
    }
  };

  const qrReaderStyle = {
    height: 240,
    width: 320
  }

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
      <div className="level">
        <div className="level-left">
          <div className="control has-icons-left">
            <input className="input"
                   type="text"
                   placeholder="Cerca partecipante"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="icon is-small is-left">
                  <i className="fas fa-search"/>
                </span>
          </div>
        </div>
        {isQrReaderOpen
          ? <div className="level-item">
            <QrReader
              style={qrReaderStyle}
              onError={(err) => console.error(err)}
              onScan={handleScan}
            />
          </div>
          : null
        }
        <div className="level-right">
          <button className="button is-link" onClick={() => setQrReaderOpen(!isQrReaderOpen)}>Leggi QR</button>
        </div>
      </div>
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