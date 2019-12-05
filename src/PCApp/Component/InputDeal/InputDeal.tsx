import React, {Component, Fragment} from 'react';
import Language from '../../../CommonData/language';
import textInputDeal from './textInputDeal';
import InputDealPresenter from './InputDealPresenter';
import { number } from 'prop-types';

interface Props {
    display: boolean,
    submit: (day: number, turn: number, bossnum: number, dmg: number, time: number) => void,
    close: () => void,
    isNew: boolean,
    editDay: number,
    editTurn: number,
    editDmg: number,
    editTime: number,
    editBoss: number
}

class InputDeal extends Component<Props> {
    lang = Language.getLang();

    constructor(props: Props) {
        super(props);

        this.updateDmgInfo = this.updateDmgInfo.bind(this);
    }

    updateDmgInfo() {
        let day = parseInt((document.getElementById("day") as HTMLInputElement).value);
        let turn = parseInt((document.getElementById("turn") as HTMLInputElement).value);
        const boss = document.querySelector("input[name=rbBoss]:checked");
        let dmg = parseInt((document.getElementById("damage") as HTMLInputElement).value);
        let time = new Date().getTime();
        // Date.now()가 더 낫지만 compatibility를 위해

        if(!this.props.isNew) time = this.props.editTime;

        let isBossChecked: boolean = false;
        let bossnum: number = -1;

        if(boss) {
            if(boss.id.endsWith('1')) bossnum = 1;
            else if(boss.id.endsWith('2')) bossnum = 2;
            else if(boss.id.endsWith('3')) bossnum = 3;
            else if(boss.id.endsWith('4')) bossnum = 4;
            else if(boss.id.endsWith('5')) bossnum = 5;

            isBossChecked = true;
        }

        if(day === undefined ||
            turn === undefined ||
            dmg === undefined ||
            !isBossChecked) {
            alert((textInputDeal.notfilled as any)[this.lang]);
            // 데이터 안채워짐 알림
        }
        else {
            if(day < 1) day = 1;
            else if(day > 15) day = 15;
            if(turn < 1) turn = 1;
            if(turn > 100) turn = 100;
            if(dmg < 0) dmg = 0;
            if(dmg > 9999999) dmg = 9999999;
            this.props.submit(day, turn, bossnum, dmg, time);
        }
    }

    render() {
        return <InputDealPresenter
                    display={this.props.display}
                    isNew={this.props.isNew}
                    updateDmgInfo={this.updateDmgInfo}
                    editDay={this.props.editDay}
                    editTurn={this.props.editTurn}
                    editDmg={this.props.editDmg}
                    editTime={this.props.editTime}
                    editBoss={this.props.editBoss}
                    close={this.props.close}
                />
    }
}

export default InputDeal;