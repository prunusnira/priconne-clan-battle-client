class Language {
    LANG_KO = "ko";
    LANG_JP = "jp";

    getLang() {
        let lang = navigator.language;// || navigator.systemLanguage;
        if(this.readCookie("lang") === 'ko' || this.readCookie("lang") === 'jp') {
            lang = this.readCookie("lang")!;
        }
        else {
            if(lang==='ko' || lang==='ko-kr' || lang==='ko-KR') {
                lang = 'ko';
            }
            else if(lang==='ja' || lang==='ja-jp' || lang==='ja-JP') {
                lang = 'jp';
            }
            else {
                lang = 'ko';
            }
        
            this.eraseCookie("lang");
            this.createCookie("lang", lang, 1);
        }
        return lang;
    }

    setLang(lang: string) {
        // lang: ko or jp or en
        this.eraseCookie("lang");
        this.createCookie("lang", lang, 1);
    }

    createCookie(name: string, value: string, days: number) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toUTCString();
        }
        else expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    readCookie(name: string) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    eraseCookie(name: string) {
        this.createCookie(name,"",-1);
    }
}

export default new Language();