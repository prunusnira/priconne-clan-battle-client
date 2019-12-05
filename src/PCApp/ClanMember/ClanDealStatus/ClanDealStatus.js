import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CommonData from '../../../CommonData/commonData';
import DealStatRow from './DealStatRow';
import Language from '../../../CommonData/language';
import textClanDeal from './textClanDeal';

import {
    Container,
    Row,
    Col,
    Button,
    Table
} from 'reactstrap';

class ClanDealStatus extends Component {
    lang = Language.getLang();
    state = {
        list: []
    }

    render() {
        const self = this;
        const type = parseInt(this.props.match.params.type);

        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h4>{textClanDeal.title[this.lang]}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="btn-group">
                        <Button tag={Link} to="/clan/sheet/0">{textClanDeal.typeDaily[this.lang]}</Button>
                        <Button tag={Link} to="/clan/sheet/1">{textClanDeal.typeTurn[this.lang]}</Button>
                        <Button tag={Link} to="/clan/sheet/2">{textClanDeal.typeList[this.lang]}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="text-center">
                        {
                            (function() {
                                if(type === CommonData.dealPageType.TYPE_DAY) {
                                    return textClanDeal.typeDaily[self.lang]
                                }
                                else if(type === CommonData.dealPageType.TYPE_TURN) {
                                    return textClanDeal.typeTurn[self.lang]
                                }
                                else if(type === CommonData.dealPageType.TYPE_LIST) {
                                    return textClanDeal.typeList[self.lang]
                                }
                            })()
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Table style={{width: "auto"}}>
                            <thead>
                                <th>
                                    <td>Day</td>
                                    <td>Boss1</td>
                                    <td>Boss2</td>
                                    <td>Boss3</td>
                                    <td>Boss4</td>
                                    <td>Boss5</td>
                                    <td>Sum</td>
                                </th>
                            </thead>
                            <tbody>
                                {/* 여기에 일일 딜량 추가 */}
                                <DealStatRow list={self.state.list} />
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Sum</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ClanDealStatus;