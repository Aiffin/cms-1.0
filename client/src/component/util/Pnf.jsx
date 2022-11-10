import React from 'react'
import { NavLink } from 'react-router-dom'

function Pnf() {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-danger">Requested Path Not Found</h3>
                <h5 className="display-5 text-warning">404 Error</h5>
                <NavLink to={`/`} className='btn btn-success'>Back to Home</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Pnf