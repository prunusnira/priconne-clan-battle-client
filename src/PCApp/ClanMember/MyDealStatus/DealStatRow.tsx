import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Damage from './Damage';
import textMyDeal from './textMyDeal';
import language from '../../../CommonData/language';

interface Props {
    type: number,
    list: Map<number, Map<number, Array<Damage>>>,
    onDmgClick: (ith: number, num: number) => void,

    // scale
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
    scale305: number
}

class DealStatRow extends Component<Props> {
    lang = language.getLang();

    getScaleValue(boss: number, turn: number): number {
        if(turn === 1) {
            switch(boss) {
                case 1: return this.props.scale101;
                case 2: return this.props.scale102;
                case 3: return this.props.scale103;
                case 4: return this.props.scale104;
                case 5: return this.props.scale105;
                default: return 0;
            }
        }
        else if(turn < 6) {
            switch(boss) {
                case 1: return this.props.scale201;
                case 2: return this.props.scale202;
                case 3: return this.props.scale203;
                case 4: return this.props.scale204;
                case 5: return this.props.scale205;
                default: return 0;
            }
        }
        else {
            switch(boss) {
                case 1: return this.props.scale301;
                case 2: return this.props.scale302;
                case 3: return this.props.scale303;
                case 4: return this.props.scale304;
                case 5: return this.props.scale305;
                default: return 0;
            }
        }
    }

    render() {
        if(this.props.list.size <= 0) {
            return (
                <tbody>
                    <tr>
                        <td className="text-center" colSpan={7}>
                            No data found
                        </td>
                    </tr>
                </tbody>
            )
        }
        else {
            // 표 그리기를 위한 계산을 여기서 수행
            const sum = [0, 0, 0, 0, 0, 0];
            const sums = [0, 0, 0, 0, 0, 0];

            // row key 값 목록을 가져온 후 최대 값을 도출
            const keysarr = new Array<number>();
            const keys = this.props.list.keys();
            let c = keys.next();
            while(!c.done) {
                keysarr.push(c.value);
                c = keys.next();
            }
            const max = Math.max(...keysarr);
            
            // 최대 key 값이 나온 상태에서 전체를 넣을 array 생성
            const display = new Array<Array<Array<Damage>>>(max);

            keysarr.sort();
            for(let i = 0; i < max; i++) {
                if(keysarr.includes(i+1)) {
                    display[i] = new Array<Array<Damage>>(5);

                    const cline: Map<number, Array<Damage>> = this.props.list.get(i+1)!;

                    // 5개의 각 요소마다 값 추가
                    for(let j = 0; j < 5; j++) {
                        if(cline.has(j+1)) {
                            display[i][j] = cline.get(j+1)!;
                        }
                        else {
                            display[i][j] = new Array<Damage>();
                        }
                    }
                }
                else {
                    // key 가 아예 존재하지 않으므로 해당 라인을 0으로 채움
                    display[i] = [];
                }
            }
            
            return (
                <Fragment>
                {
                    display.map((v: Array<Array<Damage>>, i: number) => {
                        let cell = [0, 0, 0, 0, 0];
                        let cscale = [0, 0, 0, 0, 0];

                        if(v.length !== 0) {
                            for(let i = 0; i < 5; i++) {
                                if(v[i].length !== 0) {
                                    const leng = v[i].length;
                                    for(let j = 0; j < leng; j++) {
                                        cell[i] += v[i][j].dmg;
                                        cscale[i] += v[i][j].dmg * this.getScaleValue(v[i][j].bossnum, v[i][j].turn) / 100;

                                        sum[i] += cell[i];
                                        sums[i] += cscale[i];
                                    }
                                }
                            }
                        }
                        let cellsum = cell.reduce(function(p, c) { return p+c; }, 0);
                        let scsum = cscale.reduce(function(p, c) { return p+c; }, 0);
                        sum[5] += cellsum;
                        sums[5] += scsum;

                        return (
                            <tbody>
                                <tr>
                                    <td rowSpan={2}
                                    style={{verticalAlign:'middle'}}>
                                        {i+1}
                                    </td>
                                    <td>{(textMyDeal.normal as any)[this.lang]}</td>
                                    <td>
                                        <Link to="#no_div" onClick={() => this.props.onDmgClick(i+1, 1)}>
                                            {cell[0]}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="#no_div" onClick={() => this.props.onDmgClick(i+1, 2)}>
                                            {cell[1]}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="#no_div" onClick={() => this.props.onDmgClick(i+1, 3)}>
                                            {cell[2]}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="#no_div" onClick={() => this.props.onDmgClick(i+1, 4)}>
                                            {cell[3]}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="#no_div" onClick={() => this.props.onDmgClick(i+1, 5)}>
                                            {cell[4]}
                                        </Link>
                                    </td>
                                    <td>{cellsum}</td>
                                </tr>
                                <tr>
                                    <td>
                                        {(textMyDeal.scaled as any)[this.lang]}
                                    </td>
                                    <td>
                                        {cscale[0].toFixed(2)}
                                    </td>
                                    <td>
                                        {cscale[1].toFixed(2)}
                                    </td>
                                    <td>
                                        {cscale[2].toFixed(2)}
                                    </td>
                                    <td>
                                        {cscale[3].toFixed(2)}
                                    </td>
                                    <td>
                                        {cscale[4].toFixed(2)}
                                    </td>
                                    <td>
                                        {scsum.toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
                
                    <tfoot>
                        <tr>
                            <td colSpan={2}>Sum</td>
                            <td>{sum[0]}</td>
                            <td>{sum[1]}</td>
                            <td>{sum[2]}</td>
                            <td>{sum[3]}</td>
                            <td>{sum[4]}</td>
                            <td>{sum[5]}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Scaled Sum</td>
                            <td>{sums[0].toFixed(2)}</td>
                            <td>{sums[1].toFixed(2)}</td>
                            <td>{sums[2].toFixed(2)}</td>
                            <td>{sums[3].toFixed(2)}</td>
                            <td>{sums[4].toFixed(2)}</td>
                            <td>{sums[5].toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </Fragment>
            )
        }
    }
}

export default DealStatRow;