import React, {useState} from 'react'
import PropTypes from 'prop-types'
import './GuestBrief.scss'
import moment from 'moment'
import ParticipantStatusTag from "../tags/ParticipantStatusTag"
import QRCode from "qrcode.react";
import {Link} from "react-router-dom";

const GuestBrief = (props) => {

  return (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {props.displayName}
        </p>
        <p className="subtitle">
          <>Età: <strong>{moment().diff(moment(props.dob), 'years', false)}</strong></>
          <ParticipantStatusTag isPresent={props.isPresent} additionalClasses="is-pulled-right"/>
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
        <span>
          <button className="button" onClick={() => props.onGuestExit(props.id)}>Uscita</button>
        </span>
        </p>
        <p className="card-footer-item">
        <span>
          <Link to={`/guests/${props.id}`}>Dettagli</Link>
        </span>
        </p>
      </footer>
    </div>
  )
}

GuestBrief.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  dob: PropTypes.string,
  isPresent: PropTypes.string,
  onGuestExit: PropTypes.func,
}

export default GuestBrief