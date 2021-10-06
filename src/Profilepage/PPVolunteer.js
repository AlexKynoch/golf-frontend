import React, { useState, useEffect } from 'react';
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./PPVolunteer.css"

function PPVolunteer(props) {

    const [userId, setUserId] = React.useState("615d7fb42d2b095a0593e6d7");
    const [radios, cRadios] = useState([
        ["Monday", false],
        ["Tuesday", false],
        ["Wednesday", false],
        ["Thursday", false],
        ["Friday", false],
        ["Saturday", false],
        ["Sunday", false],

    ]);

    useEffect(() => {
        // Update the document title using the browser API
        console.log(props);
        props.client.getUser(userId)
            .then((res) => {
                console.log(res.data[0]);
                cRadios(res.data[0]['availability'])
            })
    }, []);

    const showSuccess = () => {
        toast.success("Your details have been updated");
    };

    const handleSubmit = () => {
        console.log("your choices have been saved")
        showSuccess();
        props.client.updateUser(userId, { availability: radios })
            .then((res) => {
                console.log(res)
            })
    }


    const checkHandler = (e) => {
        const newState = radios.map((prev) => {
            if (e.target.value === prev[0]) {
                prev[1] = !prev[1]
            }
            return prev
        })
        cRadios(newState)
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
                            {radios.map((radio, index) => {
                                return (
                                    <ToggleButton
                                        key={index}
                                        className=" d-flex justify-content-between"
                                        type="checkbox"
                                        checked={radio[1]}
                                        value={radio[0]}
                                        onChange={e => checkHandler(e)}
                                    >
                                        {radio[0]}
                                    </ToggleButton>
                                )
                            })}
                        </ButtonGroup>

                        <div className="btn-container justify-content-end">
                            <Button className='volunteer-btn' onClick={() => handleSubmit()} variant="light">Update</Button>
                            <ToastContainer position='bottom-center' />
                        </div>
                    </Card.Body>
                </Card>

            </div >
        </>

    );
};
export default PPVolunteer


