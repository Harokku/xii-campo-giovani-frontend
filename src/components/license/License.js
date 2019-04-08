import React from 'react'
import './License.scss'
import moment from 'moment'
import PropTypes from 'prop-types'

const License = (props) => (
  <>
    <div className='box'>

      <div className='level'>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Uscita</p>
            <p className="title">{moment(props.departureDate).format('dd D/M - H:mm')}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Rientro</p>
            <p className="title">{props.returnDate ? moment(props.returnDate).format('dd D/M - H:mm') : 'In permesso'}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Parente</p>
            <p className="title">{props.parentName}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Grado parentela</p>
            <p className="title">{props.parentRelationship}</p>
          </div>
        </div>
      </div>

    </div>
  </>
)

License.propTypes = {
  id: PropTypes.string,
  departureDate: PropTypes.string,
  returnDate: PropTypes.string,
  parentName: PropTypes.string,
  parentRelationship: PropTypes.string
}

export default License