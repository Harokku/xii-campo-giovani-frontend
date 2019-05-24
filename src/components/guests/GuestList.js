import React, {useState, useEffect} from 'react'
import "./GuestList.scss"
import axios from 'axios'
import GuestBrief from './GuestBrief'

const GuestList = (props) => {
  const remoteURL = process.env.REACT_APP_REMOTE_URI;
  const localStorageName = "Campia_JWT";

  const [guests, setGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    async function getGuests() {
      try {
        const response = await axios.get(`${remoteURL}/guests`, {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        })
        setGuests(response.data.data)
        console.log(response.data.data)
      } catch (e) {
        console.error(e)
      }
    }

    getGuests()
  }, []);

  const setOffStatus = async (guestId) => {
    try {
      const response = await axios.patch(`${remoteURL}/guests/${guestId}`,
        {status: 'off'},
        {
          headers: {
            'Accept': '*/*',
            'Authorization': JSON.parse(localStorage.getItem(localStorageName))
          }
        });
      const updatedGuests = guests.map(el => {
        if (el._id === guestId) {
          const newEl = {
            ...el,
            status: 'off'
          }
          return newEl
        } else {
          return el
        }
      });
      setGuests(updatedGuests);
      return response
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="section">

      <div className="level">
        <div className="level-item">
          <div className="control has-icons-left">
            <input className="input"
                   type="text"
                   placeholder="Cerca partecipante"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <span className="icon is-small is-left">
                  <i className="fas fa-search"/>
                </span>
          </div>
        </div>
      </div>

      <div className="tile is-ancestor" style={{"flexWrap": "wrap"}}>
        {
          guests
            .filter(el => {
              if (filterStatus === 'all') {
                return true
              } else {
                return el.isPresent === filterStatus
              }
            })
            .filter(el => {
              if (searchTerm === '') {
                return true
              } else {
                return el.surname.toLowerCase().includes(searchTerm) || el.name.toLowerCase().includes(searchTerm)
              }
            })
            .map(participant => (
              <div key={participant._id} className="tile is-parent is-4">
                <div className="tile is-child">
                  <GuestBrief
                    id={participant._id}
                    displayName={`${participant.surname} ${participant.name}`}
                    dob={participant.dob}
                    isPresent={participant.status}
                    onGuestExit={setOffStatus}
                  />
                </div>
              </div>
            ))
        }
      </div>

    </section>
  )
}

export default GuestList