import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
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
                        (c) 2019 PuCoClaB by Nira / Alpha 0.0.1
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <a href="https://github.com/prunusnira/priconne-clan-battle-client"
                            target="_blank">
                            Source Code in <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default AppFooter;