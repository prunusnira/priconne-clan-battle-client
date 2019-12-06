import React, {Component, Fragment} from 'react';
import axios from 'axios';
import { RouteComponentProps, Redirect } from 'react-router';

import Damage from './Damage';
import CommonData from '../../../CommonData/commonData';
import MyDealStatusPresenter from './MyDealStatusPresenter';

import {connect} from 'react-redux';
import {actionCreator, ActionUserInfo} from '../../../Redux/Actions/index';
import {StoreState} from '../../../Redux/Reducer/index';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';
import { number } from 'prop-types';
import { variableDeclaration } from '@babel/types';

interface IMatchProps {
    type: string,
    season: string
}

interface Props {
    userinfo: ActionUserInfo,
    login: boolean
}

interface State {
    list: Array<Damage>,
    tabType: string,
    season: string,
    seasonlist: Array<JSX.Element>,
    redirect: boolean,
    
    // 딜량 입력 다이얼로그
    inputDlg: boolean,
    isInputNew: boolean,
    editDay: number,
    editTurn: number,
    editDmg: number,
    editTime: number,
    editBoss: number,

    // 각 셀 딜량 표시를 위한 다이얼로그
    cellStatDlg: boolean,

    // 딜량 표시를 위한 데이터
    display: Map<number, Map<number, Array<Damage>>>,

    // 데이터 표시 및 수정을 위한 셀 데이터
    celldata: Array<Damage>,
    cellnum: number,

    // 인게임 배율값 저장
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

    // scale dialog
    scaledlg: boolean

}

class MyDealStatus extends Component<RouteComponentProps<IMatchProps> & Props, State> {
    state: State = {
        list: [],
        tabType: "",
        season: "",
        seasonlist: [],
        redirect: false,

        // 딜량 입력 다이얼로그
        inputDlg: false,
        isInputNew: true,
        editDay: 0,
        editTurn: 0,
        editDmg: 0,
        editTime: 0,
        editBoss: 0,

        // 각 셀 딜량 표시를 위한 다이얼로그
        cellStatDlg: false,

        // 딜량 표시를 위한 데이터
        display: new Map<number, Map<number, Array<Damage>>>(),

        // 데이터 표시 및 수정을 위한 셀 데이터
        celldata: [],
        cellnum: 0,

        // 인게임 배율값 저장
        scale101: 100,
        scale102: 100,
        scale103: 130,
        scale104: 130,
        scale105: 150,
        scale201: 150,
        scale202: 150,
        scale203: 180,
        scale204: 180,
        scale205: 200,
        scale301: 200,
        scale302: 200,
        scale303: 250,
        scale304: 250,
        scale305: 300,

        // scale dialog
        scaledlg: false
    }
    
    constructor(props: RouteComponentProps<IMatchProps> & Props) {
        super(props);

        this.addNewDeal = this.addNewDeal.bind(this);
        this.onDmgClick = this.onDmgClick.bind(this);
        this.submitDlg = this.submitDlg.bind(this);
        this.closeDlg = this.closeDlg.bind(this);
        this.closeCellDlg = this.closeCellDlg.bind(this);
        this.cellEdit = this.cellEdit.bind(this);
        this.cellDel = this.cellDel.bind(this);
        this.changeSeason = this.changeSeason.bind(this);

        // season 값 조절 - Promise 사용
        // season 값을 가져온 뒤에 이후 동작이 진행되어야 함
        this.getSeasonList();
        this.getSeason(this.props.match.params.season)
        .then((data) => {
            this.setState({
                season: data
            });

            // 배율값 불러오기
            this.editScaleValue = this.editScaleValue.bind(this);
            this.toggleScaleDlg = this.toggleScaleDlg.bind(this);
            this.loadScaleValue();
            this.loadDealValue();
        });
    }

    componentDidMount() {
        // 정보 가져오기
        this.getSavedData(this.props); // state의 list만 업데이트 하면 됨
    }

    componentWillReceiveProps(props: RouteComponentProps<IMatchProps> & Props) {
        this.getSavedData(props);
    }

    getSeason(season: string): Promise<string> {
        if(season === 'recent') {
            return axios.get(CommonData.serverDataURL+'cb/recent')
            .then((res) => {
                return res.data[0].season;
            });
        }
        else {
            return new Promise((res, rej) => {
                res(season);
            });
        }
    }

    getSeasonList() {
        axios.get(CommonData.serverDataURL+'cb/seasonlist')
        .then((res) => {
            const seasons = res.data;
            seasons.map((v: any) => {
                this.state.seasonlist.push(<option value={v.season}>{v.season}</option>);
            });
        });
    }

    getSavedData(props: RouteComponentProps<IMatchProps> & Props) {
        const ptype = parseInt(props.match.params.type);
        let tabType = "";
        if(ptype == CommonData.dealPageType.TYPE_DAY) {
            this.setRow(ptype);
            tabType = "Day";
        }
        else if(ptype == CommonData.dealPageType.TYPE_TURN) {
            this.setRow(ptype);
            tabType = "Turn";
        }
        else if(ptype == CommonData.dealPageType.TYPE_LIST) {
            
        }

        this.setState({
            tabType: tabType
        });
    }

    loadScaleValue() {
        axios.post(CommonData.serverDataURL+'scale/list', {
            token: this.props.userinfo.token,
            season: this.state.season
        })
        .then((res) => {
            if(res.data.length === 0) {
                // 기본값으로 사용
                console.log("Use default value");
            }
            else {
                const arr = res.data[0];
                // 각 내용을 가져와서 세팅
                this.setState({
                    scale101: arr.scale101,
                    scale102: arr.scale102,
                    scale103: arr.scale103,
                    scale104: arr.scale104,
                    scale105: arr.scale105,
                    scale201: arr.scale201,
                    scale202: arr.scale202,
                    scale203: arr.scale203,
                    scale204: arr.scale204,
                    scale205: arr.scale205,
                    scale301: arr.scale301,
                    scale302: arr.scale302,
                    scale303: arr.scale303,
                    scale304: arr.scale304,
                    scale305: arr.scale305
                });
                console.log("Use custom scale");
            }
        });
    }

    editScaleValue(scale: Array<number>) {
        axios.post(CommonData.serverDataURL+'scale/update', {
            token: this.props.userinfo.token,
            scale: scale,
            season: this.state.season
        })
        .then((res) => {
            // scale value 갱신
            this.setState({
                scale101: scale[0],
                scale102: scale[1],
                scale103: scale[2],
                scale104: scale[3],
                scale105: scale[4],
                scale201: scale[5],
                scale202: scale[6],
                scale203: scale[7],
                scale204: scale[8],
                scale205: scale[9],
                scale301: scale[10],
                scale302: scale[11],
                scale303: scale[12],
                scale304: scale[13],
                scale305: scale[14]
            });
            this.toggleScaleDlg();
        });
    }

    loadDealValue() {
        axios.post(CommonData.serverDataURL+'deal/list', {
            playerid: this.props.userinfo.playerid,
            season: this.state.season
        })
        .then((res) => {
            // 데이터를 받아와서 Damage 인터페이스 형으로 list에 등록
            const arr:Array<Damage> = res.data;
            arr.map((v) => {
                this.state.list.push(
                    {day: v.day, turn: v.turn, bossnum: v.bossnum,
                    dmg: v.dmg, time: v.time}
                );
            });

            // 등록이 완료외면 내용이 빈 setState를 실행하여 강제 랜더링 갱신
            //this.setState({});
            this.setRow(parseInt(this.props.match.params.type));
        });
    }

    addNewDeal() {
        this.setState({
            inputDlg: true,
            isInputNew: true
        });
    }

    updateDB() {

    }

    submitDlg(day: number, turn: number, bossnum: number, dmg: number, time: number) {
        // push 하기 전에 기존 것을 삭제
        if(!this.state.isInputNew) {
            let removeIt: number = -1;
            this.state.list.map((v: Damage, i: number) => {
                if(v.time === time) {
                    removeIt = i;
                }
            });

            if(removeIt !== -1) this.state.list.splice(removeIt, 1);
        }

        this.state.list.push({"day":day, "turn":turn, "bossnum": bossnum, "dmg":dmg, "time":time});
        
        let suburl = "";
        if(this.state.isInputNew) suburl = "deal/add";
        else suburl = "deal/edit";

        // 등록함과 동시에 DB에도 저장해야 함
        axios.post(CommonData.serverDataURL+suburl, {
            playerid: this.props.userinfo.playerid,
            season: this.state.season,
            day: day,
            turn: turn,
            bossnum: bossnum,
            damage: dmg,
            time: time
        })
        .then((res) => {
            // 창 닫기
            this.closeDlg();

            // 이후 동작은 타입에 따라 결정
            this.setRow(parseInt(this.props.match.params.type));
        });
    }

    closeDlg() {
        this.setState({
            inputDlg: false
        });
    }

    /**
     * Table Row 표시 관련 메소드
     */
    setRow(type: number) {
        // 표 데이터 재설정
        const displayList = new Map<number, Map<number, Array<Damage>>>();
        this.state.list.map((v) => {
            if(type === 0) {
                if(!displayList.has(v.day)) {
                    // daily list 추가
                    displayList.set(v.day, new Map());
                }
                if(!displayList.get(v.day)!.has(v.bossnum)) {
                    displayList.get(v.day)!.set(v.bossnum, []);
                }
    
                displayList.get(v.day)!.get(v.bossnum)!.push(
                    {"day":v.day, "turn":v.turn, "bossnum":v.bossnum, "dmg":v.dmg, "time":v.time}
                );
            }
            else {
                if(!displayList.has(v.turn)) {
                    // daily list 추가
                    displayList.set(v.turn, new Map());
                }
                if(!displayList.get(v.turn)!.has(v.bossnum)) {
                    displayList.get(v.turn)!.set(v.bossnum, []);
                }
    
                displayList.get(v.turn)!.get(v.bossnum)!.push(
                    {"day":v.day, "turn":v.turn, "bossnum":v.bossnum, "dmg":v.dmg, "time":v.time}
                );
            }
        });

        this.setState({
            display: displayList
        });
    }

    /* 각 데미지 테이블을 클릭 했을 때 */
    onDmgClick(num: number, boss: number) {
        // 타입 = CommonData의 pagetype
        this.setRow(parseInt(this.props.match.params.type));

        const type = parseInt(this.props.match.params.type);
        let data = null;
        if(type === CommonData.dealPageType.TYPE_DAY) {
            data = this.state.display.get(num)!.get(boss);
        }
        else if(type === CommonData.dealPageType.TYPE_TURN) {
            data = this.state.display.get(num)!.get(boss);
        }

        this.setState({
            celldata: data!,
            cellnum: num,
            cellStatDlg: true
        });
    }

    closeCellDlg() {
        this.setState({
            cellStatDlg: false
        });
    }

    cellEdit(time: number) {
        // editmode로 열기
        // playerid, season, time으로 딜량을 가져와서 edit 값들을 할당
        // isInputNew도 false로 변경하고 수정 창 열기

        // 단일 딜량 가져오기
        axios.post(CommonData.serverDataURL+'deal/get', {
            playerid: this.props.userinfo.playerid,
            season: this.state.season,
            time: time
        })
        .then((res) => {
            const cur: Damage = res.data[0];
            this.setState({
                editDay: cur.day,
                editTurn: cur.turn,
                editDmg: cur.dmg,
                editTime: cur.time,
                editBoss: cur.bossnum,
                isInputNew: false,
                inputDlg: true
            });
        });
    }

    cellDel(time: number) {
        axios.post(CommonData.serverDataURL+'deal/remove', {
            playerid: this.props.userinfo.playerid,
            season: this.state.season,
            time: time
        })
        .then((res) => {
            // list에서도 삭제 수행
            let removeIt: number = -1;
            this.state.list.map((v: Damage, i: number) => {
                if(v.time === time) {
                    removeIt = i;
                }
            });

            if(removeIt !== -1) this.state.list.splice(removeIt, 1);
        });
    }

    toggleScaleDlg() {
        this.setState({
            scaledlg: !this.state.scaledlg
        });
    }

    changeSeason(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            season: e.currentTarget.value,
            redirect: true
        });
    }

    /* 랜더링 */
    render() {
        const type = parseInt(this.props.match.params.type);
        if(this.props.login) {
            return <MyDealStatusPresenter
                        // state
                        tabType={this.state.tabType}
                        display={this.state.display}
                        inputDlg={this.state.inputDlg}
                        isInputNew={this.state.isInputNew}
                        editDay={this.state.editDay}
                        editTurn={this.state.editTurn}
                        editDmg={this.state.editDmg}
                        editTime={this.state.editTime}
                        editBoss={this.state.editBoss}
                        cellStatDlg={this.state.cellStatDlg}
                        cellData={this.state.celldata}
                        cellNum={this.state.cellnum}

                        // Button
                        addNewDeal={this.addNewDeal}

                        // DealStatRow
                        onDmgClick={this.onDmgClick}

                        // Input Deal
                        submitDlg={this.submitDlg}
                        closeDlg={this.closeDlg}

                        // Cell Status
                        type={type}
                        closeCellDlg={this.closeCellDlg}
                        cellEdit={this.cellEdit}
                        cellDel={this.cellDel}

                        // Season Change
                        changeSeason={this.changeSeason}
                        seasonList={this.state.seasonlist}
                        redirect={this.state.redirect}

                        // Scale
                        scale101={this.state.scale101}
                        scale102={this.state.scale102}
                        scale103={this.state.scale103}
                        scale104={this.state.scale104}
                        scale105={this.state.scale105}
                        scale201={this.state.scale201}
                        scale202={this.state.scale202}
                        scale203={this.state.scale203}
                        scale204={this.state.scale204}
                        scale205={this.state.scale205}
                        scale301={this.state.scale301}
                        scale302={this.state.scale302}
                        scale303={this.state.scale303}
                        scale304={this.state.scale304}
                        scale305={this.state.scale305}

                        scaledlg={this.state.scaledlg}
                        seasonNum={this.state.season}
                        editScaleValue={this.editScaleValue}
                        toggleScaleDlg={this.toggleScaleDlg}
                    />
        }
        else {
            return <Redirect to="/error/500" />
        }
    }
}

const mapStateToProps = (state: StoreState) => ({
    userinfo: state.tokenReducer.userinfo,
    login: state.tokenReducer.login
});

export default connect(mapStateToProps)(MyDealStatus);