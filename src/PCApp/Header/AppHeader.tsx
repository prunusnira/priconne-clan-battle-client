import React, {Component, Reducer} from 'react';
import {Link} from 'react-router-dom';
import textHeader from './textHeader';
import Language from '../../CommonData/language';

import {connect} from 'react-redux';
import {actionCreator, ActionUserInfo} from '../../Redux/Actions/index';
import {StoreState} from '../../Redux/Reducer/index';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';

import {
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown
} from 'reactstrap';

interface Props {
    userinfo: ActionUserInfo,
    login: boolean,
    TokenActions: typeof actionCreator
}

class AppHeader extends Component<Props> {
    lang = Language.getLang();

    logout = () => {
        this.props.TokenActions.setLogout();
    }

    render() {
        const self = this;
        return (
            <Navbar color="dark" className="bg-dark fixed-top">
                <NavbarBrand>Priconne Resume</NavbarBrand>
                <NavItem>
                    <NavLink tag={Link} to="/">{(textHeader.main as any)[this.lang]}</NavLink>
                </NavItem>
                <NavItem>
                    {
                        (function() {
                            if(self.props.login) {
                                return <NavLink tag={Link} to="#no_div" onClick={self.logout}>{(textHeader.logout as any)[self.lang]}</NavLink>
                            }
                            else {
                                return <NavLink tag={Link} to="/user/login">{(textHeader.login as any)[self.lang]}</NavLink>
                            }
                        })()
                    }
                </NavItem>

                <UncontrolledDropdown nav inNavBar>
                    <DropdownToggle nav caret>
                        {(textHeader.user.title as any)[this.lang]}
                    </DropdownToggle>
                    <DropdownMenu left="true">
                        <DropdownItem tag={Link} to="/clan/create">
                            {(textHeader.user.createclan as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link}>
                            {(textHeader.user.joinclan as any)[this.lang]}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavBar>
                    <DropdownToggle nav caret>
                        {(textHeader.clanmember.title as any)[this.lang]}
                    </DropdownToggle>
                    <DropdownMenu left="true">
                        <DropdownItem tag={Link} to="/clan/mysheet/recent/0">
                            {(textHeader.clanmember.damstatus as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link}>
                            {(textHeader.clanmember.resume as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link} to="/clan/sheet/recent/0">
                            {(textHeader.clanmember.clanbattlestat as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link}>
                            {(textHeader.clanmember.claninfo as any)[this.lang]}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown nav inNavBar>
                    <DropdownToggle nav caret>
                        {(textHeader.clanmanager.title as any)[this.lang]}
                    </DropdownToggle>
                    <DropdownMenu left="true">
                        <DropdownItem tag={Link}>
                            {(textHeader.clanmanager.editclan as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link}>
                            {(textHeader.clanmanager.managemember as any)[this.lang]}
                        </DropdownItem>
                        <DropdownItem tag={Link}>
                            {(textHeader.clanmanager.damstatus as any)[this.lang]}
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Navbar>
        )
    }
}

const mapStateToProps = (state: StoreState) => ({
    userinfo: state.tokenReducer.userinfo,
    login: state.tokenReducer.login
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    TokenActions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);