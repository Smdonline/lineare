/**
 * Created by socia on 12/12/2023.
 */
const dataTurno = document.querySelector('#data-turno')
const inizioTurno = document.querySelector('#ora-inizio-turno')
const fineTurno = document.querySelector('#ora-fine-turno')
const submitBtn = document.querySelector('#submit-turno')

class Orario {
    #ore
    #minuti
    constructor(stringTempo) {
        let tempo = stringTempo.split(":", 2)
        if (tempo) {
            switch (tempo.length) {
                case 1:
                    this.setOre(parseInt(tempo[0]) || 0)
                    this.setMinuti(0)
                    break
                case 2:
                    this.setOre(parseInt(tempo[0]) || 0)
                    this.setMinuti(parseInt(tempo[1]) ||0)
                    break
            }
        }
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

}

document.getElementById("turno-form").addEventListener('submit',(e)=>{
    let init=inizioTurno.value
    let fine=fineTurno.value
    let data = new Date(dataTurno.value+"utc")
    e.preventDefault()
    if (isNaN(data.getTime()) ){

        console.log("invalid date")
        return false
    }
    let oraInizio = new Orario(init)
    let oraFine = new Orario(fine)
    console.log(oraInizio.ore + ":" + oraInizio.minuti)
    return true


})