import React, {Component, Fragment} from 'react';

import {
    Row,
    Col
} from 'reactstrap';

class ClanListItem extends Component {
    render() {
        const self = this;
        return (
            <Fragment>
                {
                    self.props.list.map((v, i) => {
                        return (
                            <Row>
                                {v.name}
                            </Row>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default ClanListItem;