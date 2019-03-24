import React from 'react'
import PropTypes from 'prop-types'
import "./Guest.scss"
import GuestRow from "./GuestRow";

const Guest = (props) => (
  <div className="card events-card">
    <header className="card-header">
      <p className="card-header-title">
        {props.cardName}
      </p>
    </header>
    <div className="card-table">
      <div className="content">
        <table className="table is-narrow is-fullwidth is-striped">
          <tbody>

          {/*{props.cardFields.map((row, index) => (*/}
            {/*<GuestRow*/}
              {/*key={index}*/}
              {/*icon={row.icon}*/}
              {/*fieldName={row.fieldName}*/}
              {/*fieldData={row.fieldData}*/}
              {/*onDataChange={props.onDataChange}*/}
            {/*/>*/}
          {/*))}*/}

          </tbody>
        </table>
      </div>
    </div>
    <footer className="card-footer">
      <button className="card-footer-item">View All</button>
    </footer>
  </div>
)

Guest.propTypes = {
  cardName: PropTypes.string,
  cardFields: PropTypes.arrayOf(PropTypes.object),
}

export default Guest