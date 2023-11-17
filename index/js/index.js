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
        this.giorni = nGiorni + (nOre + parseInt(nMinuti / 60)) / 24
    }
    toMilliseconds() {
        return 1000 * (this.minuti * 60 + 3600 * this.ore + 3600 * 24 * this.giorni)
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
            this.inizio = new Date(this.giorno)
            this.fine = new Date(this.giorno)
        }
        if (nInizio instanceof Durata) {
            this.inizio.setUTCMinutes(nInizio.minuti)
            this.inizio.setHours(this.inizio.getUTCHours() + nInizio.ore)
            console.log(this.inizio)

        }
        if (nDurata instanceof Durata) {
            this.fine.setUTCMinutes(nDurata.minuti)
            this.fine.setUTCHours(this.inizio.getUTCHours() + nDurata.ore)
        } else this.fine.setUTCHours(this.inizio.getUTCHours() + this.minTurnoOre.ore)
    }
}
let inizio = new Durata(24, 15)
let durata = new Durata(3, 15)
let turno = new Turno(new Date('11-16-2023 GMT'), inizio, durata)
let azi = new Date('11-16-2023 GMT')

console.log(turno)


