import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import './GuestNew.scss'
import moment from "moment"

const GuestNew = (props) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";
  const [newGuest, setGuest] = useState(null)

  const createGuest = async (guest) => {
    try {
      const response = await axios.post(`${remoteURL}/guests`,
        {newGuest},
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        })
      return response
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <p className="title">Nuovo ospite</p>
    </>
  )
}

GuestNew.propTypes = {}

export default GuestNew