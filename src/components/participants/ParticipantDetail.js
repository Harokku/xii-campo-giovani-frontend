import React, {useState, useEffect} from 'react'
import "./ParticipantDetail.scss"
import axios from 'axios'
import {Link} from "react-router-dom";
import ParticipantDetailRow from "./ParticipantDetailRow";
import ParticipantStatusTag from "../tags/ParticipantStatusTag";
import License from "../license/License";
import moment from "moment";
import NewLicense from "../license/NewLicense";

const ParticipantDetail = ({match}) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [participant, setParticipant] = useState(null);
  const [givingLicense, setGivingLicense] = useState(false)

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

  const handleReadmission = async () => {
    let updatedParticipant = null;

    Array.isArray(participant.licenze)
      ? updatedParticipant = participant.licenze.sort((a, b) => (
        new Date(b.departureDate) - new Date(a.departureDate)
      ))[0]
      : updatedParticipant = participant.licenze

    updatedParticipant['returnDate'] = moment().toISOString();

    setParticipant({...participant, "isPresent": 'present'});
    try {
      const licensePatch = await axios.patch(`${remoteURL}/licence/${updatedParticipant._id}`,
        {"returnDate": updatedParticipant.returnDate},
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        }
      )
      const presenceStatusPatch = await axios.patch(`${remoteURL}/participants/${match.params.participantId}`,
        {"isPresent": "present"},
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        }
      )
      return [licensePatch, presenceStatusPatch]
    } catch (e) {
      console.error(e)
    }
  }

  const handleLicense = async (licenseId) => {
    // TODO: Implement update on participant
    const updatedLicenses = participant.licenses ? [...participant.licenses, licenseId] : [licenseId];
    try {
      const response = await axios.patch(`${remoteURL}/participants/${match.params.participantId}`,
        {
          licenses: updatedLicenses,
          isPresent: "off"
        },
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        }
      )
      setParticipant({
        ...participant,
        licenses: updatedLicenses
      })
      toggleLicense();
      return response
    } catch (e) {
      console.error(e)
    }

  }

  const toggleLicense = () => {
    setGivingLicense(!givingLicense)
  }

  return (
    <>
      {
        participant
          ? <>
            <section className="section">
              <div className="container">
                <div className="card events-card">
                  <header className="card-header">
                    <p className="card-header-title">
                      {`${participant.surname} ${participant.name}`}
                    </p>
                    <ParticipantStatusTag isPresent={participant.isPresent} additionalClasses="is-pulled-right"/>
                  </header>
                  <div className="card-table">
                    <div className="content">
                      <table className="table is-hoverable is-fullwidth is-striped">
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
                    <p className="card-footer-item">
                      {
                        participant.isPresent === 'off'
                          ? <button onClick={() => handleReadmission()} className=" button is-success">Autorizza
                            rientro</button>
                          : <button onClick={() => setGivingLicense(true)} className=" button is-danger">Autorizza
                            uscita</button>
                      }
                    </p>
                  </footer>
                </div>
              </div>
            </section>

            <section>
              <div className='columns'>
                <div className='column has-text-centered'>
                  <p className='title'>Permessi</p>
                </div>
              </div>

              {givingLicense
                ? <NewLicense
                  participantId={participant._id}
                  onNewLicenseClose={toggleLicense}
                  onCreateLicense={handleLicense}
                />
                : null}

              {console.log(participant)}
              {participant.licenze
                ? Array.isArray(participant.licenze)
                  ? participant.licenze
                    .sort((a, b) => (
                      new Date(b.departureDate) - new Date(a.departureDate)
                    ))
                    .map(license => (
                      <License
                        key={license._id}
                        departureDate={license.departureDate}
                        returnDate={license.returnDate}
                        parentName={license.parentName}
                        parentRelationship={license.parentRelationship}
                      />
                    ))
                  : <License
                    key={participant.licenze._id}
                    departureDate={participant.licenze.departureDate}
                    returnDate={participant.licenze.returnDate}
                    parentName={participant.licenze.parentName}
                    parentRelationship={participant.licenze.parentRelationship}
                  />
                : <p>Nessuna uscita autorizzata</p>
              }
            </section>

          </>
          : <progress className="progress is-medium is-info"/>
      }
      {console.log(participant)}
    </>
  )
}

export default ParticipantDetail