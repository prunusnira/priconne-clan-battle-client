import React, {Component, Fragment} from 'react';
import textCellStatus from './textCellStatus';
import Language from '../../../CommonData/language';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Table,
    Button
} from 'reactstrap';
import commonData from '../../../CommonData/commonData';
import Damage from '../../ClanMember/MyDealStatus/Damage';

interface Props {
    display: boolean,
    type: number,
    celldata: Array<Damage>,
    cellnum: number,
    close: () => void,
    edit: (time: number) => void,
    del: (time:number) => void
}

class CellStatus extends Component<Props> {
    lang = Language.getLang();

    render() {
        const typetxt = (this.props.type === commonData.dealPageType.TYPE_DAY) ?
                        (textCellStatus.day as any)[this.lang] : (textCellStatus.turn as any)[this.lang];
        const data = this.props.celldata;
        const type = this.props.type;
        const self = this;
        return (
            <Modal isOpen={this.props.display}>
                <ModalHeader>
                    {(textCellStatus.title as any)[this.lang]}
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            <b>{this.props.cellnum}{typetxt}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            {(textCellStatus.info as any)[this.lang]}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Table>
                                <thead>
                                    <tr>
                                        <td>
                                            {
                                                (function() {
                                                    if(type === commonData.dealPageType.TYPE_DAY)
                                                        return (textCellStatus.turn as any)[self.lang];
                                                    else if(type === commonData.dealPageType.TYPE_TURN)
                                                        return (textCellStatus.day as any)[self.lang];
                                                })()
                                            }
                                        </td>
                                        <td>
                                            {(textCellStatus.damage as any)[this.lang]}
                                        </td>
                                        <td>
                                            {(textCellStatus.jobsel as any)[this.lang]}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                            {
                                data.map((c: Damage) => {
                                    return (
                                        <tr>
                                            <td>
                                            {
                                                (function() {
                                                    if(type === commonData.dealPageType.TYPE_DAY)
                                                        return c.turn;
                                                    else if(type === commonData.dealPageType.TYPE_TURN)
                                                        return c.day;
                                                })()
                                            }
                                            </td>
                                            <td>
                                                {c.dmg}
                                            </td>
                                            <td>
                                                <Button onClick={(e) => this.props.edit(c.time)}>
                                                    {(textCellStatus.edit as any)[this.lang]}
                                                </Button>
                                                <Button onClick={(e) => this.props.del(c.time)}>
                                                    {(textCellStatus.del as any)[this.lang]}
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.close}>
                        {(textCellStatus.close as any)[this.lang]}
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default CellStatus;