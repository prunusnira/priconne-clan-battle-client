import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import textLogin from './textLogin';
import GoogleLogin from 'react-google-login';
import Language from '../../../CommonData/language';
import CommonData from '../../../CommonData/commonData';

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from 'reactstrap';

interface Props {
    redirectJoin: boolean,
    redirectMain: boolean,
    redirectError001: boolean,
    jointoken: string,
    responseGoogle: (e: any) => void,
    responseFail: (f: any) => void
}

class LoginPresenter extends Component<Props> {
    lang = Language.getLang();

    render() {
        const self = this;
        if(this.props.redirectJoin) {
            return (
                <Redirect to={{
                    pathname: "/user/join",
                    state: {
                        token: self.props.jointoken
                    }
                }}/>
            )
        }
        else if(this.props.redirectMain) {
            return (
                <Redirect to="/" />
            )
        }
        else if(this.props.redirectError001) {
            return (
                <Redirect to="/error/001" />
            )
        }
        else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    {(textLogin.title as any)[this.lang]}
                                </CardHeader>
                                <CardBody>
                                    {/* Login with google sign-in */}
                                    <GoogleLogin
                                        theme="dark"
                                        clientId={CommonData.googleLoginClientId}
                                        buttonText="Login with Google"
                                        onSuccess={this.props.responseGoogle}
                                        onFailure={this.props.responseFail}
                                        cookiePolicy={'single_host_origin'} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default LoginPresenter;