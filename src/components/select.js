import React from "react";

const SelectComponent = (props) => {
    const options = props.lista.map(option => {
        return (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        );
    });
    return (
        <select {...props}>
            {options}
        </select>
    );
};

export default SelectComponent;