import React, {useState, useEffect} from 'react';
import './ParticipantsList.scss';
import axios from 'axios';
import QrReader from 'react-qr-reader'
import {Redirect} from "react-router-dom";
import ParticipantBrief from "./ParticipantBrief";
import StatusSelector from "./StatusSelector";

const ParticipantsList = () => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all')
  const [scannedQR, setScannedQR] = useState(null);
  const [isQrReaderOpen, setQrReaderOpen] = useState(false);

  const handleScan = (data) => {
    if (data !== null) {
      setScannedQR(data)
    }
  };

  const qrReaderStyle = {
    width: '100%'
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
        {isQrReaderOpen
          ? null
          : <div className="level-item">
            <StatusSelector
              onStatusChange={setFilterStatus}
            />
          </div>
        }
        <div className="level-item">
          <div className="control has-icons-left">
            <input className="input"
                   type="text"
                   placeholder="Cerca partecipante"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <span className="icon is-small is-left">
                  <i className="fas fa-search"/>
                </span>
          </div>
        </div>
        {scannedQR !== null
          ? <Redirect to={`/participants/${scannedQR.toString()}`}/>
          : null
        }
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
        <div className="level-item">
          <button className="button is-link" onClick={() => setQrReaderOpen(!isQrReaderOpen)}>Leggi QR</button>
        </div>
      </div>

      <div className="tile is-ancestor" style={{"flexWrap": "wrap"}}>
        {
          participants
            .filter(el => {
              if (filterStatus === 'all') {
                return true
              } else {
                return el.isPresent === filterStatus
              }
            })
            .filter(el => {
              if (searchTerm === '') {
                return true
              } else {
                return el.surname.toLowerCase().includes(searchTerm) || el.name.toLowerCase().includes(searchTerm)
              }
            })
            .map(participant => (
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
            ))
        }
      </div>

    </section>
  )
}

export default ParticipantsList