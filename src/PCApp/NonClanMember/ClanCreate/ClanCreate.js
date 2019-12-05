import React, {Component} from 'react';
import Language from '../../../CommonData/language';
import textClanCreate from './textClanCreate';

import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';

class ClanCreate extends Component {
    lang = Language.getLang();

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h4>{textClanCreate.title[this.lang]}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" className="text-right">
                        {textClanCreate.name[this.lang]}
                    </Col>
                    <Col xs="6">
                        <input className="form-control" id="namne" />
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" className="text-right">
                        {textClanCreate.open[this.lang]}
                    </Col>
                    <Col xs="6">
                        <label for="opneyes"><input id="opneyes" type="radio" />
                        {textClanCreate.openyes[this.lang]}</label>
                        <label for="opneno"><input id="openno" type="radio" />
                        {textClanCreate.openno[this.lang]}</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6"></Col>
                    <Col xs="6">
                        {textClanCreate.opendesc[this.lang]}
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" className="text-right">
                        {textClanCreate.recruiting[this.lang]}
                    </Col>
                    <Col xs="6">
                        <label for="recruityes"><input id="recruityes" type="radio" />
                        {textClanCreate.recruityes[this.lang]}</label>
                        <label for="recruitno"><input id="recruitno" type="radio" />
                        {textClanCreate.recruitno[this.lang]}</label>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" className="text-right">
                        {textClanCreate.outerlink[this.lang]}
                    </Col>
                    <Col xs="6">
                        <input className="form-control" id="outerlink" />
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" className="text-right">
                        {textClanCreate.innerlink[this.lang]}
                    </Col>
                    <Col xs="6">
                        <input className="form-control" id="innerlink" />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="btn-group">
                        <Button>{textClanCreate.create[this.lang]}</Button>
                        <Button>{textClanCreate.cancel[this.lang]}</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ClanCreate;