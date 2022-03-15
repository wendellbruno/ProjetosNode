class AppointmentFactory {

    build(consult){

        const day = consult.date.getDate()+1;
        const month = consult.date.getMonth();
        const year = consult.date.getFullYear();

        const hour = Number.parseInt(consult.time.split(":")[0]);
        const minutes = Number.parseInt(consult.time.split(":")[1]);

        const startDate = new Date(year, month, day, hour,minutes, 0,0);

        const appo = {
            id: consult._id,
            title: consult.name + " " + consult.description,
            start: startDate,
            end: startDate,
            notified: consult.notified,
            email: consult.email
        }
        return appo;
    }

}

module.exports = new AppointmentFactory();