import React, {Component, Fragment} from 'react';
import axios from 'axios';
import CustomScaleTablePresenter from './CustomScaleTablePres';
import CustomScaleTableEdit from './CustomScaleTableEdit';

import { StoreState } from '../../../Redux/Reducer';
import {actionCreator, ActionUserInfo} from '../../../Redux/Actions/index';
import { connect } from 'react-redux';
import CommonData from '../../../CommonData/commonData';

interface Props {
    userinfo: ActionUserInfo,
    login: boolean,
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
    seasonNum: string,
    scaledlg: boolean,
    toggleScaleDlg: () => void,
    editScaleValue: (scale: Array<number>) => void
}

class CustomScaleTable  extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <CustomScaleTablePresenter
                    toggle={this.props.toggleScaleDlg}
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
                />

                <CustomScaleTableEdit
                    toggle={this.props.toggleScaleDlg}
                    edit={this.props.editScaleValue}
                    display={this.props.scaledlg}
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
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state: StoreState) => ({
    userinfo: state.tokenReducer.userinfo,
    login: state.tokenReducer.login
});

export default connect(mapStateToProps)(CustomScaleTable);