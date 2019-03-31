import React, {useState, useEffect} from 'react'
import "./ParticipantDetail.scss"
import axios from 'axios'
import {Link} from "react-router-dom";
import ParticipantDetailRow from "./ParticipantDetailRow";

const ParticipantDetail = ({match}) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participant, setParticipant] = useState(null);

  const formModel = [
    {icon: 'users', displayName: 'Cognome', key: 'surname'},
    {icon: 'user', displayName: 'Nome', key: 'name'},
    {icon: 'calendar-day', displayName: 'Data di Nascita', key: 'dob'},
    {icon: 'credit-card', displayName: 'Codice Fiscale', key: 'cf'},
    {icon: 'scroll', displayName: 'Ruolo', key: 'role'},
    {icon: 'home', displayName: 'Comitato', key: 'criUnit'},
    {icon: 'at', displayName: 'E-Mail', key: 'mail'},
    {icon: 'mobile', displayName: 'Tel Personale', key: 'personalPhone'},
    {icon: 'phone', displayName: 'Tel Parente', key: 'parentsPhone'},
    {icon: 'allergies', displayName: 'Allergie', key: 'allergies'},
    {icon: 'crutch', displayName: 'Patologie', key: 'pathologies'},
    {icon: 'capsules', displayName: 'Terapie', key: 'therapies'},
  ];

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

  const patchParticipant = async (key, data) => {
    try {
      const response = await axios.patch(`${remoteURL}/participants/${match.params.participantId}`,
        {[key]: data},
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        }
      )
      return response
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = (itemKey) => (data) => {
    console.group('Curried invocation params');
    console.log(`Item key: ${itemKey}`);
    console.log(`Row data: ${data}`);
    console.groupEnd()
    setParticipant({
      ...participant,
      [itemKey]: data
    });
    patchParticipant(itemKey, data)
  };

  return (
    <>
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

                      {formModel.map((row, index) => (
                        <ParticipantDetailRow
                          key={index}
                          icon={row.icon}
                          displayName={row.displayName}
                          data={participant[row.key]}
                          onSubmit={handleSubmit(row.key)}
                        />
                      ))}

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