import React, {Component, Fragment} from 'react';
import textCellStatus from './textCellStatus';
import Damage from '../../ClanMember/MyDealStatus/Damage';
import Language from '../../../CommonData/language';

import {
    Button,
    Row,
    Col
} from 'reactstrap';

interface Props {
    list: Array<Damage>
}

class EachDealStat extends Component<Props> {
    lang = Language.getLang();
    
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((v: Damage) => {
                        return (
                            <Row>
                                <Col xs="12">
                                    {/*딜량*/}
                                    {/*일자*/}
                                    {/*회자*/}
                                    <Button>{(textCellStatus.edit as any)[this.lang]}</Button>
                                    <Button>{(textCellStatus.del as any)[this.lang]}</Button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default EachDealStat;