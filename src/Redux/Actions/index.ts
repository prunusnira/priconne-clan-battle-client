// action: 어떤 변화가 일어나야 할지 알려주는 객체
// 액션 자체는 그냥 객체임
// 액션은 스토어에 데이터를 넣는 유일한 방법

// action 타입 정의
export const SETLOGIN = 'SETLOGIN';
export const SETLOGOUT = 'SETLOGOUT';

export interface ActionUserInfo {
    id: string,
    token: string,
    name: string,
    playerid: string
}

interface SetLoginAction {
    type: typeof SETLOGIN,
    login: boolean,
    userinfo: ActionUserInfo
}

interface SetLogoutAction {
    type: typeof SETLOGOUT,
    login: boolean,
    userinfo: ActionUserInfo
}

export type RootAction =
    | SetLoginAction
    | SetLogoutAction;

// action 정의
// 액션이 dispatch에 의해 store로 전달되면
// store 내의 reducer에 의해 store에 저장됨
function setLogin(userinfo: ActionUserInfo): SetLoginAction {
    return {
        type: SETLOGIN,
        login: true,
        userinfo
    };
}

function setLogout(): SetLogoutAction {
    return {
        type: SETLOGOUT,
        login: false,
        userinfo: {
            id: '',
            token: '',
            name: '',
            playerid: ''
        }
    }
}

// 액션생산자: 액션을 만드는 함수 혹은 변수
// 나중에 dispatch를 해야 액션을 보낸다
export const actionCreator = {
    setLogin,
    setLogout
};