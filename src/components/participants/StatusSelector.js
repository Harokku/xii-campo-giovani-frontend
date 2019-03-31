import React, {useState} from 'react'
import './StatusSelector.scss'
import PropTypes from 'prop-types'

const StatusSelector = (props) => {
  const [activeSelection, setActiveSelection] = useState('all');

  const handleSelectionChange = (state) => {
    setActiveSelection(state);
    props.onStatusChange(state);
  };

  return (
    <div className="buttons has-addons">
      <span className={`button ${activeSelection === 'all' ? 'is-info is-active' : ''}`}
            onClick={() => handleSelectionChange('all')}
      >All</span>
      <span className={`button ${activeSelection === 'present' ? 'is-success is-active' : ''}`}
            onClick={() => handleSelectionChange('present')}
      >Al campo</span>
      <span className={`button ${activeSelection === 'away' ? 'is-warning is-active' : ''}`}
            onClick={() => handleSelectionChange('away')}
      >In missione</span>
      <span className={`button ${activeSelection === 'off' ? 'is-danger is-active' : ''}`}
            onClick={() => handleSelectionChange('off')}
      >In Licenza</span>
    </div>
  )
}

StatusSelector.propTypes = {
  onStatusChange: PropTypes.func
}

export default StatusSelector