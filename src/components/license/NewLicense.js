import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import moment from 'moment'

const NewLicense = (props) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [parent, setParent] = useState({parent: '', relation: ''});

  const createLicense = async () => {
    try {
      const response = await axios.post(`${remoteURL}/licence`,
        {
          participantId: props.participantId,
          departureDate: moment().toISOString(),
          parentName: parent.parent,
          parentRelationship: parent.relation,
        },
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        }
      )
      props.onCreateLicense(response.data._id)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="container">
        <div className="notification">
          <div className='level'>
            <div className="level-left">
              <div className="level-item has-text-centered">
                <p className="is-size-1">Nuova licenza</p>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button className="button is-success" onClick={() => createLicense()}>
                  <span className="icon is-small">
                    <i className="fas fa-check"/>
                  </span>
                  <span>Concedi</span>
                </button>
              </div>
              <div className="level-item">
                <button className="button is-danger is-outlined" onClick={() => props.onNewLicenseClose()}>
                  <span className="icon is-small">
                    <i className="fas fa-times"/>
                  </span>
                  <span>Chiudi</span>
                </button>
              </div>
            </div>
          </div>
          <div className='level'>
            <div className="level-item has-text-centered">
              <div className="field">
                <label className="label">Maggiorenne</label>
                <div className="control">
                  <input className="input"
                         type="text"
                         placeholder="Cognome e Nome"
                         value={parent.parent}
                         onChange={(e) => setParent({...parent, parent: e.target.value})}
                  />
                </div>
                <p className="help">Cognome e Nome del maggiorenne che prende in carico</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div className="field">
                <label className="label">Grado parentela</label>
                <div className="control">
                  <input className="input"
                         type="text"
                         placeholder="Madre, Padre..."
                         value={parent.relation}
                         onChange={(e) => setParent({...parent, relation: e.target.value})}
                  />
                </div>
                <p className="help">Grado di parentela con il minorenne</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

NewLicense.propTypes = {
  participantId: PropTypes.string.isRequired,
  onNewLicenseClose: PropTypes.func,
  onCreateLicense: PropTypes.func,
}

export default NewLicense