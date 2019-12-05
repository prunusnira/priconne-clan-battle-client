import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DealStatRow from './DealStatRow';
import textMyDeal from './textMyDeal';
import Damage from './Damage';
import CustomScaleTable from './CustomScaleTable';
import InputDeal from '../../Component/InputDeal/InputDeal';
import CellStatus from '../../Component/CellStatus/CellStatus';
import CommonData from '../../../CommonData/commonData';
import Language from '../../../CommonData/language';

import {
    Container,
    Row,
    Col,
    Button,
    Table
} from 'reactstrap';

interface Props {
    // state
    tabType: string,
    display: Map<number, Map<number, Array<Damage>>>,
    inputDlg: boolean,
    isInputNew: boolean,
    editDay: number,
    editTurn: number,
    editDmg: number,
    editTime: number,
    editBoss: number,
    cellStatDlg: boolean,
    cellData: Array<Damage>,
    cellNum: number,

    // Button
    addNewDeal: () => void,

    // DealStatRow
    onDmgClick: (num: number, boss: number) => void,

    // Input Deal
    submitDlg: (day: number, turn: number, boss: number, dmg: number, time: number) => void,
    closeDlg: () => void,

    // CellStatus
    type: number,
    closeCellDlg: () => void,
    cellEdit: (time: number) => void,
    cellDel: (time: number) => void,

    // Scale
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
    scale305: number,
    scaledlg: boolean,
    seasonNum: string,
    editScaleValue: (scale: Array<number>) => void,
    toggleScaleDlg: () => void
}

class MyDealStatusPreseneter extends Component<Props> {
    lang = Language.getLang();

    render() {
        const self = this;

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h4>{(textMyDeal.title as any)[self.lang]}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="btn-group">
                        <Button tag={Link} to={"/clan/mysheet/"+this.props.seasonNum+"/0"}>{(textMyDeal.typeDaily as any)[this.lang]}</Button>
                        <Button tag={Link} to={"/clan/mysheet/"+this.props.seasonNum+"/1"}>{(textMyDeal.typeTurn as any)[this.lang]}</Button>
                        <Button tag={Link} to={"/clan/mysheet/"+this.props.seasonNum+"/2"}>{(textMyDeal.typeList as any)[this.lang]}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <CustomScaleTable
                            scale101={this.props.scale101}
                            scale102={this.props.scale102}
                            scale103={this.props.scale103}
                            scale104={this.props.scale104}
                            scale105={this.props.scale105}
                            scale201={this.props.scale201}
                            scale202={this.props.scale202}
                            scale203={this.props.scale203}
                            scale204={this.props.scale204}
                            scale205={this.props.scale205}
                            scale301={this.props.scale301}
                            scale302={this.props.scale302}
                            scale303={this.props.scale303}
                            scale304={this.props.scale304}
                            scale305={this.props.scale305}
                            seasonNum={this.props.seasonNum}
                            scaledlg={this.props.scaledlg}
                            toggleScaleDlg={this.props.toggleScaleDlg}
                            editScaleValue={this.props.editScaleValue}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-center">
                        {
                            (function() {
                                if(self.props.type === CommonData.dealPageType.TYPE_DAY) {
                                    return (textMyDeal.typeDaily as any)[self.lang]
                                }
                                else if(self.props.type === CommonData.dealPageType.TYPE_TURN) {
                                    return (textMyDeal.typeTurn as any)[self.lang]
                                }
                                else if(self.props.type === CommonData.dealPageType.TYPE_LIST) {
                                    return (textMyDeal.typeList as any)[self.lang]
                                }
                            })()
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <td colSpan={2}>{this.props.tabType}</td>
                                    <td>Boss1</td>
                                    <td>Boss2</td>
                                    <td>Boss3</td>
                                    <td>Boss4</td>
                                    <td>Boss5</td>
                                    <td>Sum</td>
                                </tr>
                            </thead>
                            {/* 여기에 일일 딜량 추가 */}
                            <DealStatRow
                                type={self.props.type}
                                onDmgClick={self.props.onDmgClick}
                                list={self.props.display}
                                scale101={self.props.scale101}
                                scale102={self.props.scale102}
                                scale103={self.props.scale103}
                                scale104={self.props.scale104}
                                scale105={self.props.scale105}
                                scale201={self.props.scale201}
                                scale202={self.props.scale202}
                                scale203={self.props.scale203}
                                scale204={self.props.scale204}
                                scale205={self.props.scale205}
                                scale301={self.props.scale301}
                                scale302={self.props.scale302}
                                scale303={self.props.scale303}
                                scale304={self.props.scale304}
                                scale305={self.props.scale305} />
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="btn-group">
                        <Button onClick={() => this.props.addNewDeal()}>{(textMyDeal.adddeal as any)[self.lang]}</Button>
                    </Col>
                </Row>

                <InputDeal
                    display={this.props.inputDlg}
                    submit={this.props.submitDlg}
                    close={this.props.closeDlg}
                    isNew={this.props.isInputNew}
                    editDay={this.props.editDay}
                    editTurn={this.props.editTurn}
                    editDmg={this.props.editDmg}
                    editTime={this.props.editTime}
                    editBoss={this.props.editBoss}
                />

                <CellStatus
                    display={this.props.cellStatDlg}
                    type={this.props.type}
                    celldata={this.props.cellData}
                    cellnum={this.props.cellNum}
                    close={this.props.closeCellDlg}
                    edit={this.props.cellEdit}
                    del={this.props.cellDel}
                />
            </Container>
        )
    }
}

export default MyDealStatusPreseneter;