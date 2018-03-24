import React from "react";
import Dropdown, { DropdownTrigger, DropdownContent } from '../../../Dropdown/Dropdown';
import "./ColumnSelectorPopup.css";

class ColumnSelectorPopup extends React.Component {

    render() {

        return (
            <Dropdown className="ColumnSelectorPopup">
                <DropdownTrigger className="ColumnSelectorPopup">Columns</DropdownTrigger>
                <DropdownContent className="ColumnSelectorPopup">
                    <div className="header">Select columns:</div>
                    <ul>
                        {this.props.columns.filter(item => item.hideable).map(item => (
                            <li key={item.id} onClick={() => this.props.onToggleColumn(item)}>
                                {item.title}
                                <input type="checkbox" checked={item.visible} />
                            </li>)
                        )}
                    </ul>
                </DropdownContent>
            </Dropdown>
        );
    }
}

export default ColumnSelectorPopup;