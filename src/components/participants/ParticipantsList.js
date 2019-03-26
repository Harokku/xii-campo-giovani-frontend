import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './ParticipantsList.scss';
import axios from 'axios';
import ParticipantBrief from "./ParticipantBrief";

const ParticipantsList = (props) => {
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
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
        <div className="tile is-parent is-4">
          <div className="tile is-child">
            <ParticipantBrief
              displayName="Fabio vuolo"
              dob="21"
              status="Al campo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


ParticipantsList.propTypes = {}

export default ParticipantsList