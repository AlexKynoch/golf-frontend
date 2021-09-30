import React from "react";



const Test = () => {
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
    };

    const handleChangeTwo = () => {
        setCheckedTwo(!checkedTwo);
    };

    return (
        <div>
            <Checkbox
                label="Value 1"
                value={checkedOne}
                onChange={handleChangeOne}
            />
            <Checkbox
                label="Value 2"
                value={checkedTwo}
                onChange={handleChangeTwo}
            />
        </div>
    );
};

export default Test