import React, {Component} from 'react';
import Language from '../../../CommonData/language';
import textInputDeal from './textInputDeal';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Button
} from 'reactstrap';

interface Props {
    display: boolean,
    isNew: boolean,
    updateDmgInfo: () => void,
    editDay: number,
    editTurn: number,
    editDmg: number,
    editTime: number,
    editBoss: number,
    close: () => void
}

class InputDealPresenter extends Component<Props> {
    lang = Language.getLang();

    render() {
        let dfDay = "";
        let dfTurn = "";
        let dfDmg = "";
        let boss1r = false;
        let boss2r = false;
        let boss3r = false;
        let boss4r = false;
        let boss5r = false;

        if(!this.props.isNew) {
            dfDay = this.props.editDay.toString();
            dfTurn = this.props.editTurn.toString();
            dfDmg = this.props.editDmg.toString();

            switch(this.props.editBoss) {
                case 1: boss1r = true; break;
                case 2: boss2r = true; break;
                case 3: boss3r = true; break;
                case 4: boss4r = true; break;
                case 5: boss5r = true; break;
            }
        }

        return (
            <Modal isOpen={this.props.display} size="lg">
                {/* 딜량 입력에 필요한 것
                    1. 일차
                    2. 회차
                    3. 보스
                    4. 데미지
                */}
                <ModalHeader>
                    {(textInputDeal.title as any)[this.lang]}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="3">
                            {(textInputDeal.day as any)[this.lang]}
                        </Col>
                        <Col xs="9">
                            <input id="day" className="form-control"
                                type="number" min="1" max="15"
                                defaultValue={dfDay} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            {(textInputDeal.turn as any)[this.lang]}
                        </Col>
                        <Col xs="9">
                            <input id="turn" className="form-control"
                                type="number" min="1" max="100"
                                defaultValue={dfTurn} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            {(textInputDeal.boss as any)[this.lang]}
                        </Col>
                        <Col xs="9">
                            <label className="btn btn-primary" htmlFor="rbBoss1">
                                <input id="rbBoss1" name="rbBoss" value="1" type="radio" defaultChecked={boss1r} />Boss 1
                            </label>
                            <label className="btn btn-primary" htmlFor="rbBoss2">
                                <input id="rbBoss2" name="rbBoss" value="2" type="radio" defaultChecked={boss2r} />Boss 2
                            </label>
                            <label className="btn btn-primary" htmlFor="rbBoss3">
                                <input id="rbBoss3" name="rbBoss" value="3" type="radio" defaultChecked={boss3r} />Boss 3
                            </label>
                            <label className="btn btn-primary" htmlFor="rbBoss4">
                                <input id="rbBoss4" name="rbBoss" value="4" type="radio" defaultChecked={boss4r} />Boss 4
                            </label>
                            <label className="btn btn-primary" htmlFor="rbBoss5">
                                <input id="rbBoss5" name="rbBoss" value="5" type="radio" defaultChecked={boss5r} />Boss 5
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            {(textInputDeal.damage as any)[this.lang]}
                        </Col>
                        <Col xs="9">
                            <input id="damage" className="form-control"
                                type="number" min="0" max="99999999"
                                defaultValue={dfDmg}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            {(textInputDeal.comp as any)[this.lang]}
                        </Col>
                        <Col xs="9">
                            {/*<SelectSearch
                                options={options}
                                value=""
                                name="comp1"
                                placeholder="Character1"
                            />
                            <SelectSearch
                                options={options}
                                value=""
                                name="comp2"
                                placeholder="Character2"
                            />
                            <SelectSearch
                                options={options}
                                value=""
                                name="comp3"
                                placeholder="Character3"
                            />
                            <SelectSearch
                                options={options}
                                value=""
                                name="comp4"
                                placeholder="Character4"
                            />
                            <SelectSearch
                                options={options}
                                value=""
                                name="comp5"
                                placeholder="Character5"
                            />*/}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.updateDmgInfo}>
                        {(textInputDeal.submit as any)[this.lang]}
                    </Button>
                    <Button onClick={this.props.close}>
                        {(textInputDeal.cancel as any)[this.lang]}
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const options = [
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {name: "", value: ""},
    {
        className: "form-control"
    }
];

export default InputDealPresenter;