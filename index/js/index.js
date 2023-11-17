/*class orario in formato hh:mm*/
class Orario {
    #ore
    #minuti
    constructor(ore, minuti = 0) {
        ore = parseInt(ore)
        minuti = parseInt(minuti)
        if (!isNaN(ore) && ore >= 0) {
            this.setOre(ore)
        } else this.ore = 0
        if (!isNaN(minuti) && minuti >= 0) {
            this.setMinuti(minuti)
        } else this.minuti = 0
    }
    setMinuti(minuti) {
        minuti = parseInt(minuti)
        if (!isNaN(minuti)) {
            this.minuti = minuti % 60
        }

    }
    setOre(ore) {
        ore = parseInt(ore)
        if (!isNaN(ore)) {
            this.ore = ore % 24
        }

    }
    fromString(stringTempo) {
        let tempo = stringTempo.split(":", 2)
        if (tempo) {
            switch (tempo.length) {
                case 1:
                    this.setOre(parseInt(tempo[0]))
                    break
                case 2:
                    this.setOre(parseInt(tempo[0]))
                    this.setMinuti(parseInt(tempo[1]))
                    break
            }
        }
    }
}

class Durata {
    giorni
    ore
    minuti
    constructor(nOre = 0, nMinuti = 0, nGiorni = 0) {
        nMinuti = parseInt(nMinuti)
        nOre = parseInt(nOre)
        nGiorni = parseInt(nGiorni)
        if (isNaN(parseInt(nMinuti))) nMinuti = 0
        if (isNaN(parseInt(nOre))) nOre = 0
        if (isNaN(parseInt(nGiorni))) nGiorni = 0

        this.minuti = nMinuti % 60
        this.ore = (nOre + parseInt(nMinuti / 60)) % 24
        this.giorni = nGiorni + parseInt((nOre ) / 24)
    }
    toMilliseconds() {
        return 1000 * (this.minuti * 60 + 3600 * this.ore + 3600 * 24 * this.giorni)
    }
    toString(){
        let ore,minuti
        ore = this.giorni * 24 + this.ore
        if (ore < 10) ore = "0"+this.ore
        if (this.minuti < 10) minuti = "0"+this.minuti
        else minuti=this.minuti
        return ore + ":" + minuti
    }

}

class Turno {

    #giorno
    #inizio
    #fine
    #maxFineTurno
    #maxOre = 36
    #minTurnoOre = new Durata(2)


    constructor(nGiorno, nInizio, nDurata) {
        if ((nGiorno !== undefined) && (nGiorno instanceof Date)) {
            this.giorno = nGiorno
            this.inizio = new Date(this.giorno.toUTCString())
            this.fine = new Date(this.giorno.toUTCString())
        }
        if (nInizio instanceof Durata) {
            this.inizio.setUTCMinutes(nInizio.minuti)
            this.inizio.setUTCHours(this.inizio.getUTCHours() + nInizio.ore)
            this.inizio.setUTCDate(this.inizio.getUTCDate() + nInizio.giorni)
        }
        if (nDurata instanceof Durata) {
            this.fine.setUTCMinutes(this.inizio.getUTCMinutes() + nDurata.minuti)
            this.fine.setUTCHours(this.inizio.getUTCHours() + nDurata.ore)
            this.fine.setUTCDate(this.inizio.getUTCDate() + nDurata.giorni)

        } else this.fine.setUTCHours(this.inizio.getUTCHours() + this.minTurnoOre.ore)
    }

    #formatDateTime(date,mostraTempo=true){
        let mese, giorno, ora, minuti
        if(date.getUTCMonth()<10) mese="0"+date.getUTCMonth()
        else mese = date.getUTCMonth()
        if(date.getUTCDay()<10) giorno="0"+date.getUTCDay()
        else ora = date.getUTCDay()
        if(date.getUTCHours()<10) ora="0"+date.getUTCHours()
        else ora = date.getUTCHours()
        if(date.getUTCMinutes()<10) minuti="0"+date.getUTCMinutes()
        else minuti = date.getUTCMinutes()

        let rezult = date.getUTCFullYear() + "-" + mese + "-" + giorno
        if (mostraTempo === true) rezult+= " "+ora +":"+minuti
    return rezult
    }
    durata(){
        let ore, minuti,millisec
        millisec = this.fine - this.inizio

        minuti = (millisec)/(60*1000)
        ore = minuti/60
        minuti = minuti%60
        return new Durata(ore, minuti)
    }
    getGiorno(){
        return this.#formatDateTime(this.giorno,false)
    }
    getInizio(){
        return this.#formatDateTime(this.inizio)
    }
    getFine(){
        return this.#formatDateTime(this.fine)
    }

}

let inizio = new Durata(12, 30)
let durata = new Durata(3, 15)
let turno = new Turno(new Date("2023-11-16"), inizio, durata)



console.log(turno.getGiorno()+ " "+turno.getInizio()+" "+turno.getFine()+" "+turno.durata())


