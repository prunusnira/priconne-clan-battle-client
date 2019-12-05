import mariadb, {PoolConnection} from 'mariadb';
import CommonData from '../commondata';

class DBClanBattle {
    private static dbpool = mariadb.createPool({
        host: CommonData.DBAddr,
        port: CommonData.DBPort,
        user: CommonData.DBUser,
        password: CommonData.DBPass,
        connectionLimit: 5
    });

    static QueryGetCBList(): string {
        return "SELECT * FROM p_cbattle ORDER BY season DESC";
    }

    static QueryGetCBRecent(): string {
        return "SELECT season FROM p_cbattle ORDER BY season DESC LIMIT 1";
    }

    static async GetCBList() {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetCBList();
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

    static async GetCBRecent() {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetCBRecent();
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

export default DBClanBattle;