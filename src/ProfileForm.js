import React from 'react'

function ProfileForm() {
    return (
        <div>
            <form>
                <div class="form-group row">
                    <label for="inputUsername3" class="col-sm-3 col-form-label">Username</label>
                    <div class="col-sm-8">
                        <input type="username" class="form-control" id="inputUsername3" placeholder="Username"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputFirstName3" class="col-sm-3 col-form-label">First Name</label>
                    <div class="col-sm-8">
                        <input type="firstname" class="form-control" id="inputFirstName3" placeholder="First Name"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputSurname3" class="col-sm-3 col-form-label">Surname</label>
                    <div class="col-sm-8">
                        <input type="surname" class="form-control" id="inputSurname3" placeholder="Second Name"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputLocation3" class="col-sm-3 col-form-label">Location</label>
                    <div class="col-sm-8">
                        <input type="location" class="form-control" id="inputLocation3" placeholder="Location"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPhone3" class="col-sm-3 col-form-label">Phone</label>
                    <div class="col-sm-8">
                        <input type="phone" class="form-control" id="inputPhone3" placeholder="Phone"></input>
                    </div>
                </div>


            </form >
        </div >
    )
}
export default ProfileForm;