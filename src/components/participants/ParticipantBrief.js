import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './ParticipantBrief.scss'
import moment from 'moment'
import QRCode from 'qrcode.react'
import {Link} from "react-router-dom";
import ParticipantStatusTag from "../tags/ParticipantStatusTag";

const ParticipantBrief = (props) => {
  const [showQR, setShowQr] = useState(false);

  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {props.displayName}
        </p>
        <p className="subtitle">
          {showQR
            ? <QRCode
              value={props.id}
              includeMargin={true}
            />
            : <>Età: <strong>{moment().diff(moment(props.dob), 'years', false)}</strong></>
          }
          <ParticipantStatusTag isPresent={props.isPresent} additionalClasses="is-pulled-right"/>
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
        <span>
          <button className="button" onClick={() => setShowQr(!showQR)}>QR</button>
        </span>
        </p>
        <p className="card-footer-item">
        <span>
          <Link to={`/participants/${props.id}`}>Dettagli</Link>
        </span>
        </p>
      </footer>
    </div>
  )
}

ParticipantBrief.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  dob: PropTypes.string,
  isPresent: PropTypes.string,
}

export default ParticipantBrief