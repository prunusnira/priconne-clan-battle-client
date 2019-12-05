import mariadb, {PoolConnection} from 'mariadb';
import CommonData from '../commondata';

class DBMyDeal {
    private static dbpool = mariadb.createPool({
        host: CommonData.DBAddr,
        port: CommonData.DBPort,
        user: CommonData.DBUser,
        password: CommonData.DBPass,
        connectionLimit: 5
    });

    static QueryAddMyDeal(playerid: string,
                        season: string,
                        day: number,
                        turn: number,
                        bossnum: number,
                        damage: number,
                        time: number): string {
        return "INSERT INTO p_cbdamage \
                    VALUES('"+playerid+"', '"+season+"', "+day+", "+turn+",\
                    "+bossnum+", "+damage+", "+time+")";
    }

    static QueryEditMyDeal(playerid: string,
                        season: string,
                        day: number,
                        turn: number,
                        bossnum: number,
                        damage: number,
                        time: number): string {
        return "UPDATE p_cbdamage\
                SET day="+day+", turn="+turn+",\
                    bossnum="+bossnum+", dmg="+damage+"\
                WHERE playerid='"+playerid+"' AND season='"+season+"' AND\
                    time="+time;
    }

    static QueryRemoveMyDeal(playerid: string,
                        season: string,
                        time: number): string {
        return "DELETE FROM p_cbdamage\
                WHERE playerid='"+playerid+"' AND season='"+season+"' AND\
                time="+time;
    }

    static QueryGetMyDealList(playerid: string,
                        season: string): string {
        return "SELECT * FROM p_cbdamage\
                WHERE playerid='"+playerid+"' AND season='"+season+"'";
    }

    static QueryGetMyDeal(playerid: string,
                        season: string,
                        time: number): string {
        return "SELECT * FROM p_cbdamage\
                WHERE playerid='"+playerid+"' AND season='"+season+"' AND\
                time="+time;
    }

    static async AddMyDeal(playerid: string,
                        season: string,
                        day: number,
                        turn: number,
                        bossnum: number,
                        damage: number,
                        time: number) {
        let con: PoolConnection;
        try {
            const query = this.QueryAddMyDeal(playerid, season, day, turn,
                                        bossnum, damage, time);
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            await con.query(query);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
        }
    }

    static async EditMyDeal(playerid: string,
                        season: string,
                        day: number,
                        turn: number,
                        bossnum: number,
                        damage: number,
                        time: number) {
        let con: PoolConnection;
        try {
            const query = this.QueryEditMyDeal(playerid, season, day,
                                            turn, bossnum, damage, time);
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            await con.query(query);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
        }
    }

    static async RemoveMyDeal(playerid: string,
                            season: string,
                            time: number) {
        let con: PoolConnection;
        try {
            const query = this.QueryRemoveMyDeal(playerid, season, time);
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            await con.query(query);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
        }
    }

    static async GetMyDealList(playerid: string,
                            season: string) {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetMyDealList(playerid, season);
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            row = await con.query(query);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
            return row;
        }
    }

    static async GetMyDeal(playerid: string,
                        season: string,
                        time: number) {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetMyDeal(playerid, season, time);
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            row = await con.query(query);
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
            return row;
        }
    }
}

export default DBMyDeal;