import React from "react";
import Dropdown, { DropdownTrigger, DropdownContent } from '../../../Dropdown/Dropdown';
import "./ColumnSelectorPopup.css";

class ColumnSelectorPopup extends React.Component {

    render() {

        return (
            <Dropdown className="ColumnSelectorPopup">
                <DropdownTrigger className="ColumnSelectorPopup">Columns</DropdownTrigger>
                <DropdownContent className="ColumnSelectorPopup">
                    <label>Select columns:</label>
                    <ul>
                        {this.props.columns.map(item => (
                            <li key={item.id} onClick={() => this.props.onToggleColumn(item)}>{item.title}</li>)
                        )}
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }
}

export default ColumnSelectorPopup;