import React from 'react';
import Avatar from 'components/Avatar';
import { Row } from 'reactstrap';

const ContactHeader = (props) => (
    
        <Row className="heading">
            <Avatar src={props.user.avatar}/>
            <div>contacts</div>
            <div className="ml-auto nav-link" onClick={props.toggle} >
                <li className="fa fa-bars"/>
            </div>
        </Row>
)

export default ContactHeader;