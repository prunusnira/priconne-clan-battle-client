import mariadb, { PoolConnection } from 'mariadb';
import CommonData from '../commondata.js';
// This file has critical info - like db username or password

class DBUser {
    private static dbpool = mariadb.createPool({
        host: CommonData.DBAddr,
        port: CommonData.DBPort,
        user: CommonData.DBUser,
        password: CommonData.DBPass,
        connectionLimit: 5
    });

    // DB쿼리
    static QueryCreateUser(name: string, token: string) {
        return "INSERT INTO p_user\
                    SET \
                    token='"+token+"',\
                    username='"+name+"'";
    }

    static QueryAddCharacter(token: string, name: string, id: string, ismain: string) {
        return "INSERT INTO p_character\
                    SET\
                    token='"+token+"',\
                    accname='"+name+"',\
                    playerid='"+id+"',\
                    ismain='"+ismain+"'";
    }

    static QueryGetUserAndMainCharByToken(token: string) {
        return "SELECT a.token, username, id, playerid FROM\
                    p_user a, p_character b\
                    WHERE\
                        a.token = b.token AND\
                        b.ismain = 'Y' AND\
                        a.token='"+token+"'";
    }

    static QueryGetUserByToken(token: string) {
        return "SELECT * FROM p_user\
                    WHERE token='"+token+"'";
    }

    static QueryGetCharacterList(token: string) {
        return "SELECT * FROM p_character\
                    WHERE token='"+token+"'";
    }

    static QueryGetCharacterMain(token: string) {
        return "SELECT * FROM p_character\
                    WHERE token='"+token+"'\
                    and ismain='Y'";
    }

    static async GetUserAndMainCharByToken(token: string) {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetUserAndMainCharByToken(token);
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

    static async GetUserByToken(token: string) {
        let con: PoolConnection, row: any;
        try {
            const query = this.QueryGetUserByToken(token);
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

    static async CreateUser(name: string, token: string, id: string) {
        let con;
        try {
            const queryUser = this.QueryCreateUser(name, token);
            const queryChar = this.QueryAddCharacter(token, name, id, 'Y');
            con = await this.dbpool.getConnection();
            con.query("USE priconne");
            await con.query(queryUser, (err, row, meta) => {
                if(err) return "1";
            });
            con.query(queryChar, (err, row, meta) => {
                if(err) return "2";
            });
        }
        catch(err) {
            console.log(err);
        }
        finally {
            if(con) con.end();
            return "0";
        }
    }
}

export default DBUser;