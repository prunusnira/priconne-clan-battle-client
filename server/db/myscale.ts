import mariadb, { PoolConnection, Pool, MariaDbError } from "mariadb";
import CommonData from "../commondata";

class DBScale {
    private static dbpool = mariadb.createPool({
        host: CommonData.DBAddr,
        port: CommonData.DBPort,
        user: CommonData.DBUser,
        password: CommonData.DBPass,
        connectionLimit: 5
    });

    static QueryScaleUpdate(token: string, season: string, scale: Array<number>) {
        return "INSERT INTO p_scaletable \
            VALUES ('"+token+"', '"+season+"', '"+scale[0]+"', '"+scale[1]+"',\
            '"+scale[2]+"', '"+scale[3]+"', '"+scale[4]+"', '"+scale[5]+"', \
            '"+scale[6]+"', '"+scale[7]+"', '"+scale[8]+"', '"+scale[9]+"', \
            '"+scale[10]+"', '"+scale[11]+"', '"+scale[12]+"', '"+scale[13]+"', \
            '"+scale[14]+"')\
            ON DUPLICATE KEY UPDATE \
                scale101=VALUES(scale101),\
                scale102=VALUES(scale102),\
                scale103=VALUES(scale103),\
                scale104=VALUES(scale104),\
                scale105=VALUES(scale105),\
                scale201=VALUES(scale201),\
                scale202=VALUES(scale202),\
                scale203=VALUES(scale203),\
                scale204=VALUES(scale204),\
                scale205=VALUES(scale205),\
                scale301=VALUES(scale301),\
                scale302=VALUES(scale302),\
                scale303=VALUES(scale303),\
                scale304=VALUES(scale304),\
                scale305=VALUES(scale305)"
    }

    static QueryScaleList(token: string, season: string): string {
        return "SELECT * FROM p_scaletable \
                    WHERE token='"+token+"' AND season='"+season+"'";
    }

    static async ScaleUpdate(token: string, season: string, scale: Array<number>) {
        let con: PoolConnection;
        try {
            const query = this.QueryScaleUpdate(token, season, scale);
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

    static async GetScaleTable(token: string, season: string) {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryScaleList(token, season);
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

export default DBScale;