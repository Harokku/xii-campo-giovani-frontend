import React from 'react'
import './ParticipantStatusTag.scss'
import PropTypes from 'prop-types'

const ParticipantStatusTag = (props) => {
  const statusVariation = {
    present: {color: 'is-success', text: 'Al campo'},
    away: {color: 'is-warning', text: 'In missione'},
    off: {color: 'is-danger', text: 'In licenza'},
  };

  return (
    <span className={`tags has-addons ${props.additionalClasses}`} >
    <span className="tag">Stato</span>
    <span
      className={`tag ${statusVariation[props.isPresent] ? statusVariation[props.isPresent].color : 'is-outlined'}`}>{statusVariation[props.isPresent] ? statusVariation[props.isPresent].text : 'Sconosciuto'}</span>
  </span>
  )
}

ParticipantStatusTag.propTypes = {
  additionalClasses: PropTypes.string,
  isPresent: PropTypes.string.isRequired,
}

export default ParticipantStatusTag