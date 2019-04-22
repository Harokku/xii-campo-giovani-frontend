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
      <span className={`button ${activeSelection === 'disponibile' ? 'is-success is-active' : ''}`}
            onClick={() => handleSelectionChange('disponibile')}
      >Disponibile</span>
      <span className={`button ${activeSelection === 'in viaggio' ? 'is-warning is-active' : ''}`}
            onClick={() => handleSelectionChange('in viaggio')}
      >In viaggio</span>
      <span className={`button ${activeSelection === 'non operativo' ? 'is-danger is-active' : ''}`}
            onClick={() => handleSelectionChange('non operativo')}
      >Non operativo</span>
    </div>
  )
}

StatusSelector.propTypes = {
  onStatusChange: PropTypes.func
}

export default StatusSelector