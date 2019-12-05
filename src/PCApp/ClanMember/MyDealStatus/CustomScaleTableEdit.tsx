import React, {Component, Fragment} from 'react';
import textMyDeal from './textMyDeal';
import Language from '../../../CommonData/language';
import txtCustomScale from './txtCustomScale';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Row,
    Col,
    Button
} from 'reactstrap';

interface Props {
    toggle: () => void,
    edit: (scale: Array<number>) => void,
    display: boolean,
    scale101: number,
    scale102: number,
    scale103: number,
    scale104: number,
    scale105: number,
    scale201: number,
    scale202: number,
    scale203: number,
    scale204: number,
    scale205: number,
    scale301: number,
    scale302: number,
    scale303: number,
    scale304: number,
    scale305: number
}

class CustomScaleTableEdit extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.editScale = this.editScale.bind(this);
    }

    lang = Language.getLang();

    editScale() {
        const arr = Array<number>();
        const s101 = parseInt((document.getElementById("scale101") as HTMLInputElement).value);
        const s102 = parseInt((document.getElementById("scale102") as HTMLInputElement).value);
        const s103 = parseInt((document.getElementById("scale103") as HTMLInputElement).value);
        const s104 = parseInt((document.getElementById("scale104") as HTMLInputElement).value);
        const s105 = parseInt((document.getElementById("scale105") as HTMLInputElement).value);
        const s201 = parseInt((document.getElementById("scale201") as HTMLInputElement).value);
        const s202 = parseInt((document.getElementById("scale202") as HTMLInputElement).value);
        const s203 = parseInt((document.getElementById("scale203") as HTMLInputElement).value);
        const s204 = parseInt((document.getElementById("scale204") as HTMLInputElement).value);
        const s205 = parseInt((document.getElementById("scale205") as HTMLInputElement).value);
        const s301 = parseInt((document.getElementById("scale301") as HTMLInputElement).value);
        const s302 = parseInt((document.getElementById("scale302") as HTMLInputElement).value);
        const s303 = parseInt((document.getElementById("scale303") as HTMLInputElement).value);
        const s304 = parseInt((document.getElementById("scale304") as HTMLInputElement).value);
        const s305 = parseInt((document.getElementById("scale305") as HTMLInputElement).value);

        arr.push(s101);
        arr.push(s102);
        arr.push(s103);
        arr.push(s104);
        arr.push(s105);
        arr.push(s201);
        arr.push(s202);
        arr.push(s203);
        arr.push(s204);
        arr.push(s205);
        arr.push(s301);
        arr.push(s302);
        arr.push(s303);
        arr.push(s304);
        arr.push(s305);

        this.props.edit(arr);
    }

    render() {
        return (
            <Modal isOpen={this.props.display} className="modal-lg">
                <ModalHeader>
                    {(textMyDeal.scale as any)[this.lang]}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            <Table className="text-center">
                                <tr>
                                    <td>Phase</td>
                                    <td>Boss 1</td>
                                    <td>Boss 2</td>
                                    <td>Boss 3</td>
                                    <td>Boss 4</td>
                                    <td>Boss 5</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <input type="number"
                                            id="scale101"
                                            className="form-control"
                                            defaultValue={this.props.scale101} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale102"
                                            className="form-control"
                                            defaultValue={this.props.scale102} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale103"
                                            className="form-control"
                                            defaultValue={this.props.scale103} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale104"
                                            className="form-control"
                                            defaultValue={this.props.scale104} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale105"
                                            className="form-control"
                                            defaultValue={this.props.scale105} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <input type="number"
                                            id="scale201"
                                            className="form-control"
                                            defaultValue={this.props.scale201} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale202"
                                            className="form-control"
                                            defaultValue={this.props.scale202} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale203"
                                            className="form-control"
                                            defaultValue={this.props.scale203} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale204"
                                            className="form-control"
                                            defaultValue={this.props.scale204} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale205"
                                            className="form-control"
                                            defaultValue={this.props.scale205} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>
                                        <input type="number"
                                            id="scale301"
                                            className="form-control"
                                            defaultValue={this.props.scale301} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale302"
                                            className="form-control"
                                            defaultValue={this.props.scale302} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale303"
                                            className="form-control"
                                            defaultValue={this.props.scale303} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale304"
                                            className="form-control"
                                            defaultValue={this.props.scale304} />
                                    </td>
                                    <td>
                                        <input type="number"
                                            id="scale305"
                                            className="form-control"
                                            defaultValue={this.props.scale305} />
                                    </td>
                                </tr>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className="btn-group">
                    <Button onClick={this.editScale}>
                        {(txtCustomScale.btnedit as any)[this.lang]}
                    </Button>
                    <Button onClick={this.props.toggle}>
                        {(txtCustomScale.btnclose as any)[this.lang]}
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CustomScaleTableEdit;