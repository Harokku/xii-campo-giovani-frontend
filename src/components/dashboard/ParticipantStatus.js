import React from 'react'
import PropTypes from 'prop-types'
import './ParticipantStatus.scss'

const ParticipantStatus = (props) => (
  <div className={`notification has-text-centered ${props.color}`}>
    <p className="title is-1">{props.number}</p>
    <p className="subtitle is-4">{props.name}</p>
  </div>
)

ParticipantStatus.propTypes = {
  color: PropTypes.string,
  number: PropTypes.number,
  name: PropTypes.string,
}

export default ParticipantStatus