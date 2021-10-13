import React, { useState, useEffect } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PPVolunteer.css";

function PPVolunteer(props) {
  const [userChange, cUserChange] = useState(undefined)
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
    if (!props.currentUser) {
      return;
    }
    cRadios(props.currentUser["availability"]);
  }, [props.currentUser]);

  const showSuccess = () => {
    toast.success("Your details have been updated");
  };

  const handleSubmit = () => {
    console.log("your choices have been saved");
    showSuccess();
    props.client
      .updateUser(props.currentUser._id, { availability: radios })
      .then((res) => {
        props.client
          .getUser(props.currentUser._id)
          .then((response) => 
          cUserChange(response.data))  
      })
    
  };

  const checkHandler = (e) => {
    const newState = radios.map((prev) => {
      if (e.target.value === prev[0]) {
        prev[1] = !prev[1];
      }
      return prev;
    });
    cRadios(newState);
  };

  useEffect(() => {
    if (userChange) {
      window.localStorage.setItem('user', JSON.stringify(userChange))
    }  
  },[userChange])

  return (
    <>
      <div className="volunteer-container">
        <Card id="myDays" className="volunteer-card">
          <Card.Body className="volunteer-card-body">
            <Card.Title className="volunteer-card-title">
              My Available Days
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <br />
            <ButtonGroup vertical className="d-flex flex-column">
              {radios.map((radio, index) => {
                return (
                  <ToggleButton
                    key={index}
                    className=" d-flex justify-content-between button-profile"
                    type="checkbox"
                    checked={radio[1]}
                    value={radio[0]}
                    onChange={(e) => checkHandler(e)}
                  >
                    {radio[0]}
                  </ToggleButton>
                );
              })}
            </ButtonGroup>

            <div className="btn-container justify-content-end">
              <Button
                className="volunteer-btn button-profile"
                onClick={() => handleSubmit()}
                variant="light"
              >
                Update
              </Button>

              <ToastContainer position="bottom-center" />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default PPVolunteer;
