import React, {Component} from 'react';
import {
    Row, Col
} from 'reactstrap';

class AppFooter extends Component {
    render() {
        return (
            <footer style={{padding: "50px",
                height: "50px",
                fontSize: "80%"}}>
                <Row>
                    <Col xs="12">
                        (c) 2019 MyPriconneResume (가칭) by PrunusNira
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default AppFooter;