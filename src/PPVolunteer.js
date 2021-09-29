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

    const [checked, setChecked] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState("");
    const radios = [
        { name: "Monday", value: true },
        { name: "Tuesday", value: false },
        { name: "Wednesday", value: false },
        { name: "Thursday", value: false },
        { name: "Friday", value: false },
        { name: "Saturday", value: false },
        { name: "Sunday", value: false },

    ];

    // const showSuccess = () => {
    //     toast.success("Your details have been updated");
    // };

    // const handleSubmit = () => {
    //     console.log("your choices have been saved")
    //     showSuccess();

    return (
        <>
            <div className="Container row">
                <Card id="myProfile" style={{ width: '15rem' }}>
                    <Card.Body>
                        <Card.Title>My Available Days</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>


                        {/* <ButtonGroup toggle className="row mb-2">
                            <ToggleButton
                                type="checkbox"
                                checked={checked}
                                value="1"
                                onChange={e => setChecked(e.currentTarget.checked)}
                            >
                                Checkbox
                            </ToggleButton>
                        </ButtonGroup> */}
                        <br />
                        <ButtonGroup vertical className="d-flex flex-column">
                            {radios.map((radio, index) => (
                                <ToggleButton
                                    key={index}
                                    className=" d-flex justify-content-between"
                                    type="checkbox"
                                    checked={checked}
                                    value={index}
                                    onChange={e => setChecked(e.currentTarget.checked)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>

                        {/* <div className="btn-container justify-content-end">
                                <Button onClick={() => handleSubmit()} variant="light">Update</Button>
                                <ToastContainer position='bottom-center' />
                            </div> */}
                    </Card.Body>
                </Card>

            </div >
        </>

    );
};
export default PPVolunteer


