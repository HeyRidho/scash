import axios from "axios";
import "./DinasLuar.css";

const DinasLuar = () => {
    let dated = new Date()
    let day = dated.getDate();
    let month = dated.getMonth()+1;
    let year = dated.getFullYear();

    if(month <= 10) {
        month = '0'+ month
    }

    if(day <= 10) {
        day = '0'+ day
    }

    let fullDate = `${year}-${month}-${day}`;

    function handleForm(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const hour = e.target.hour.value;
        const job = e.target.job.value;
        const date = e.target.date.value;

        axios.post('http://192.168.103.215:8000/api/dinasluar', {name, hour, job, date})
        .then(res => e.target.reset()).catch(err => console.log(err))
    }


    return (
        <section id="dinasluar">
            <div className="dinasluar-title">
                <h2>Form Dinas Luar</h2>
            </div>
            
            <form onSubmit={handleForm}>
                <label className="form-title" htmlFor="nik">NIK</label>
                <input type="text" placeholder="Ex : 00970722" name="nik" id="nik" required />

                <label className="form-title" htmlFor="name">Nama</label>
                <input type="text" placeholder="Ex : SAUGI, TEGUH, RIDHO" name="name" id="name" required />

                <label className="form-title" htmlFor="destination">Tujuan</label>
                <input type="text" placeholder="Ex : SC 2 KRW, AHM, SMK MI" name="destination" id="destination" required />

                <label className="form-title" htmlFor="date">Tanggal</label><br />
                <input type="date" name="date" id="date" defaultValue={fullDate} required />

                <label className="form-title" htmlFor="bbm">BBM</label>
                <input type="number" placeholder="Ketik harga" name="bbm" id="bbm" />

                <label className="form-title" htmlFor="tol">Tol</label>
                <input type="number" placeholder="Ketik harga" name="tol" id="tol" />

                <label className="form-title" htmlFor="food">Makan</label>
                <input type="number" placeholder="Ketik harga" name="food" id="food" />

                <label className="form-title" htmlFor="hotel">Hotel</label>
                <input type="number" placeholder="Ketik harga" name="hotel" id="hotel" />

                <label className="form-title" htmlFor="another">Lain - lain</label>
                <input type="number" placeholder="Ketik harga" name="another" id="another" />

                <button className="form-button">Submit</button>
            </form>
                
        </section>
    )
}

export default DinasLuar;