import React from "react";
import { withRouter } from "react-router-dom";
import Auth from 'Auth';
import Avatar from "components/Avatar";
import moment from "moment";
import { Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from "reactstrap";


const ChatHeader = props => {

    const logout = () => {
        Auth.logout();
        /* mine */props.logout();
        props.history.push('/');
    };

    const status = () => {
        if(props.typing) return 'typing now';
        if(props.contact.status === true) return 'online now';
        if(props.contact.status) return moment(props.contact.status).fromNow();
    };

    /**
     * Render Component
     */
    return (
        <Row className="heading m-0">
            <div onClick={props.toggle} >
                <Avatar src={props.contact.avatar} />
            </div>
            <div className="text-left">
                <div>{props.contact ? props.contact.name : ''}</div>
                <small>{status()}</small>
            </div>
            <Nav className="ml-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={e => props.history.push('/password')}>Changing password</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={logout}>Logout </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Row>
    );
};

export default withRouter(ChatHeader);