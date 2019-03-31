import React, {useState, useEffect} from 'react'
import "./ParticipantDetail.scss"
import axios from 'axios'
import {Link} from "react-router-dom";
import ParticipantDetailRow from "./ParticipantDetailRow";

const ParticipantDetail = ({match}) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participant, setParticipant] = useState(null);

  const iconsList = [
    'users',
    'user',
    'calendar-day',
    'credit-card',
    'scroll',
    'home',
    'at',
    'mobile',
    'phone',
    'allergies',
    'crutch',
    'capsules',
    'check'
  ];

  const formFields = [
    'Cognome',
    'Nome',
    'Data di Nascita',
    'Cofice Fiscale',
    'Ruolo',
    'Comitato',
    'Mail',
    'Tel personale',
    'Tel parente',
    'Allergie',
    'Patologie',
    'Terapie',
    'È presente'
  ]

  useEffect(() => {
    async function getParticipant() {
      try {
        const response = await axios.get(`${remoteURL}/participants/${match.params.participantId}`, {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        })
        setParticipant(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    getParticipant()
  }, []);

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <h1>{match.params.participantId}</h1>
      <h2>{JSON.stringify(participant)}</h2>
      {
        participant
          ? <section className="section">
            <div className="container">
              <div className="card events-card">
                <header className="card-header">
                  <p className="card-header-title">
                    {`${participant.surname} ${participant.name}`}
                  </p>
                  <span className="tags has-addons is-pulled-right">
                <span className="tag">Stato</span>
                <span className={`tag ${participant.isPresent ? 'is-success' : 'is-danger'}`}>
                  {`${participant.isPresent ? 'Al campo' : 'In licenza'}`}
                </span>
              </span>
                </header>
                <div className="card-table">
                  <div className="content">
                    <table className="table is-narrow is-fullwidth is-striped">
                      <tbody>

                      <ParticipantDetailRow
                        icon={iconsList[0]}
                        fieldName={formFields[0]}
                        data={participant.surname}
                        onSubmit={handleSubmit}
                      />

                      </tbody>
                    </table>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to="/participants" className="card-footer-item">View All</Link>
                </footer>
              </div>
            </div>
          </section>
          : <progress className="progress is-medium is-info"/>
      }
    </>
  )
}

export default ParticipantDetail