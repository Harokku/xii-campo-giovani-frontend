import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./GuestRow.scss"

const GuestRow = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [rowData, setRowData] = useState(props.fieldData);

  return (
    <tr>
      <td width="5%"><i className={props.icon}/></td>
      <td><strong>{props.fieldName}</strong></td>
      <td onClick={() => setEditing(true)}>
        {
          isEditing
            ? <input autoFocus className="input" type="text" value={rowData} onChange={e => setRowData(e.target.value)} onBlur={() => setEditing(false)}/>
            : rowData
        }
      </td>
      <td>
        {
          isEditing
            ? <button
              className="button is-small is-primary"
              onClick={() =>
                {
                  setEditing(false);
                  props.onDataChange(props.fieldName, rowData);
                }
              }>Salva</button>
            : null
        }
      </td>
    </tr>
  )
}

GuestRow.propTypes = {
  icon: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  fieldData: PropTypes.string,
  onDataChange: PropTypes.func,
}

export default GuestRow