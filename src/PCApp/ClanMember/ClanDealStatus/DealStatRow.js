import React, {Component, Fragment} from 'react';
import DealStatPerBoss from './DealStatPerBoss'

import {

} from 'reactstrap';

class DealStatRow extends Component {
    render() {
        return (
            <Fragment>
                {
                    this.props.list.map((v, i) => {
                        return (
                            <tr>
                                <td>{v.num}</td>
                                <td>
                                    <DealStatPerBoss />
                                </td>
                                <td>
                                    <DealStatPerBoss />
                                </td>
                                <td>
                                    <DealStatPerBoss />
                                </td>
                                <td>
                                    <DealStatPerBoss />
                                </td>
                                <td>
                                    <DealStatPerBoss />
                                </td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </Fragment>
        )
    }
}

export default DealStatRow;