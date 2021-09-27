import React from 'react'

function ProfileForm() {
    return (
        <div>
            <form>
                <div className="form-group row">
                    <label form="inputUsername3" className="col-sm-3 col-form-label">Username</label>
                    <div className="col-sm-8">
                        <input type="username" className="form-control" id="inputUsername3" placeholder="Username"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label form="inputFirstName3" className="col-sm-3 col-form-label">First Name</label>
                    <div className="col-sm-8">
                        <input type="firstname" className="form-control" id="inputFirstName3" placeholder="First Name"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label form="inputSurname3" className="col-sm-3 col-form-label">Surname</label>
                    <div className="col-sm-8">
                        <input type="surname" className="form-control" id="inputSurname3" placeholder="Second Name"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label form="inputLocation3" className="col-sm-3 col-form-label">Location</label>
                    <div className="col-sm-8">
                        <input type="location" className="form-control" id="inputLocation3" placeholder="Location"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label form="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" id="inputEmail3" placeholder="Email"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label form="inputPhone3" className="col-sm-3 col-form-label">Phone</label>
                    <div className="col-sm-8">
                        <input type="phone" className="form-control" id="inputPhone3" placeholder="Phone"></input>
                    </div>
                </div>


            </form >
        </div >
    )
}
export default ProfileForm;