import React, {Component} from 'react';
import ClanListItem from './ClanListItem';
import Language from '../../../CommonData/language';
import textClanList from './textClanList';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

class ClanList extends Component {
    lang = Language.getLang();
    state = {
        clanlist: []
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs="12">
                        <h4>{textClanList.title[this.lang]}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <ClanListItem list={this.state.clanlist} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ClanList;