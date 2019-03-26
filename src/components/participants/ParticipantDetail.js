import React, {useState, useEffect} from 'react'
import "./ParticipantDetail.scss"
import axios from 'axios'
import {Link} from "react-router-dom";

const ParticipantDetail = ({match}) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participant, setParticipant] = useState(null);

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
  }, [])

  return (
    <>
      <h1>{match.params.participantId}</h1>
      <h2>{JSON.stringify(participant)}</h2>
      {
        participant
          ? <section className="section">
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

                    </tbody>
                  </table>
                </div>
              </div>
              <footer className="card-footer">
                <Link to="/participants" className="card-footer-item">View All</Link>
              </footer>
            </div>
          </section>
          : <progress className="progress is-medium is-info"/>
      }
    </>
  )
}

export default ParticipantDetail