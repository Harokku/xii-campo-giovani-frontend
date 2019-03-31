import React, {useState} from 'react'
import PropTypes from 'prop-types'

const ParticipantDetailRow = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [rowData, setRowData] = useState(props.data);

  return (
    <tr>
      <td width="5%"><i className={`fas fa-${props.icon}`}/></td>
      <td><strong>{props.displayName}</strong></td>
      <td onClick={() => isEditing ? null : setEditing(true)}>
        {
          isEditing
            ? <div className="field has-addons">
              <div className="control is-expanded">
                <input autoFocus className="input" type="text" value={rowData}
                       onChange={e => setRowData(e.target.value)}
                />
              </div>
              <div className="control">
                <button
                  className="button is-small is-primary"
                  onClick={() => {
                    setEditing(false);
                    props.onSubmit(rowData);
                  }
                  }><i className="fas fa-check"/>
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-small is-danger"
                  onClick={() => {
                    setEditing(false);
                    setRowData(props.data);
                  }
                  }><i className="fas fa-times"/>
                </button>
              </div>
            </div>
            : rowData
        }
      </td>
    </tr>
  )
}

ParticipantDetailRow.propTypes = {
  icon: PropTypes.string,
  displayName: PropTypes.string,
  data: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default ParticipantDetailRow