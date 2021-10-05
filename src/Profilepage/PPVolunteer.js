import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./PPVolunteer.css"

function PPVolunteer() {

    const [checked, setChecked] = React.useState([]);

    const radios = [
        { name: "Monday", value: true },
        { name: "Tuesday", value: false },
        { name: "Wednesday", value: false },
        { name: "Thursday", value: false },
        { name: "Friday", value: false },
        { name: "Saturday", value: false },
        { name: "Sunday", value: false },

    ];

    const showSuccess = () => {
        toast.success("Your details have been updated");
    };

    const handleSubmit = () => {
        console.log("your choices have been saved")
        showSuccess();
    }

    function alreadyClicked() {

    }

    const checkHandler = (e) => {
        // console.log(e.target.value);
        // console.log(checked);
        setChecked((prev) => {
            let newState = [...prev]
            //    if e.target.value already clicked or already in state array
            if (newState.includes(parseInt(e.target.value))) {
                newState = newState.filter((v) => {
                    return (v !== parseInt(e.target.value))
                })
            } else {
                newState.push(parseInt(e.target.value))

            }
            // remove it from state array 
            // else e.target.value not in state add to state 
            // newState.push(parseInt(e.target.value))/ const filteredNewState = newState.filter(newState.includes() => e.target.value)
            return newState
        })
        console.log(checked)
    }
    return (
        <>
            <div className="volunteer-container row">
                <Card id="myProfile" className="volunteer-card" style={{ width: '15rem' }}>
                    <Card.Body className="volunteer-card-body">
                        <Card.Title className="volunteer-card-title">My Available Days</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <br />
                        <ButtonGroup vertical className="d-flex flex-column">
                            {radios.map((radio, index) => (
                                <ToggleButton
                                    key={index}
                                    className=" d-flex justify-content-between"
                                    type="checkbox"
                                    checked={checked.includes(index)}
                                    value={index}
                                    onChange={e => checkHandler(e)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>

                        <div className="btn-container justify-content-end">
                            <Button className = 'volunteer-btn' onClick={() => handleSubmit()} variant="light">Update</Button>
                            <ToastContainer position='bottom-center' />
                        </div>
                    </Card.Body>
                </Card>

            </div >
        </>

    );
};
export default PPVolunteer


