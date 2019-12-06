import React, {Component} from 'react';
import textMyDeal from './textMyDeal';
import Language from '../../../CommonData/language';

import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
    Button
} from 'reactstrap';

interface Props {
    toggle: () => void,
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

class CustomScaleTablePresenter extends Component<Props> {
    lang = Language.getLang();
    render() {
        return (
            <Card>
                <CardHeader>
                    <h5>{(textMyDeal.scale as any)[this.lang]}</h5>
                    {(textMyDeal.scaledesc as any)[this.lang]}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <Button onClick={this.props.toggle}>수정</Button>
                            <Table className="text-center" style={{fontSize:"80%"}}>
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
                                    <td>{this.props.scale101}</td>
                                    <td>{this.props.scale102}</td>
                                    <td>{this.props.scale103}</td>
                                    <td>{this.props.scale104}</td>
                                    <td>{this.props.scale105}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>{this.props.scale201}</td>
                                    <td>{this.props.scale202}</td>
                                    <td>{this.props.scale203}</td>
                                    <td>{this.props.scale204}</td>
                                    <td>{this.props.scale205}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>{this.props.scale301}</td>
                                    <td>{this.props.scale302}</td>
                                    <td>{this.props.scale303}</td>
                                    <td>{this.props.scale304}</td>
                                    <td>{this.props.scale305}</td>
                                </tr>
                            </Table>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default CustomScaleTablePresenter;