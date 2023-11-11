/**
 * Created by MIhai DAniel SOcianu on 11/11/2023.
 */

let azi = new Date('1984-11-31');
console.log(azi);
class Turno {
    inizio = "00:00";
    fine = "00:00";

    constructor(inizio, fine) {
        this.inizio = inizio;
        this.fine = fine;
    }

    get_inizio() {
        return this.inizio;
    }

    get_fine() {
        return this.fine;
    }
}

let tur = new Turno("06:00", "10:30");
console.log(tur.inizio);