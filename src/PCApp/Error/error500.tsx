import React, {Component} from 'react';

import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import txtError from './txtError';
import language from '../../CommonData/language';

class Error500 extends Component {
    lang = language.getLang();
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h3>Error</h3>
                        <h4>Code: 500</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {(txtError.e500_1 as any)[this.lang]}<br/>
                        {(txtError.e500_2 as any)[this.lang]}
                    </Col>
                </Row>
                <Row>
                    <Col xs="!2">
                        <Button tag={Link} to="/">
                            {(txtError.backToMain as any)[this.lang]}
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Error500;