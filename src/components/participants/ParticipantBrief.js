import React from 'react'
import PropTypes from 'prop-types'
import './ParticipantBrief.scss'

const ParticipantBrief = (props) => (
  <div className="card">
    <div className="card-content">
      <p className="title">
        {props.displayName}
      </p>
      <p className="subtitle">
        Eta: <strong>{props.dob}</strong>
        <span className="tags has-addons is-pulled-right">
              <span className="tag">Stato</span>
              <span className="tag is-success">{props.status}</span>
            </span>
      </p>
    </div>
    <footer className="card-footer">
      <p className="card-footer-item">
        <span>
          <a>QR</a>
        </span>
      </p>
      <p className="card-footer-item">
        <span>
          <a>Dettagli</a>
        </span>
      </p>
    </footer>
  </div>
)

ParticipantBrief.propTypes = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  dob: PropTypes.string,
  status: PropTypes.string,
}

export default ParticipantBrief