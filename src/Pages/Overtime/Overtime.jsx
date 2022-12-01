import { member } from "./member";
import { useState } from "react";
import axios from "axios";
import "./Overtime.css";

const Overtime = () => {
    const [sended, setSended] = useState(false);
    
    let dated = new Date()
    let day = dated.getDate();
    let month = dated.getMonth()+1;
    let year = dated.getFullYear();

    if(month < 10) {
        month = '0'+ month
    }

    if(day < 10) {
        day = '0'+ day
    }

    let fullDate = `${year}-${month}-${day}`;

    function handleForm(e) {
        e.preventDefault();

        const name = e.target.name.value;
        const hour = e.target.hour.value;
        const job = e.target.job.value;
        const date = e.target.date.value;

        axios.post('https://gray-sleepy-fish.cyclic.app/api/overtime', {name, hour, job, date})
        .then(res => {
            setSended(true)
            e.target.hour.reset()
            e.target.job.reset()
            e.target.date.reset()
        }).catch(err => console.log(err))
    }


    return (
        <section id="overtime">
            { sended &&
                <div className="popup-container">
                    <div className="popup">
                        <h4>Terimakasih!</h4>
                        <p>Data berhasil dikirim</p>
                        <button className="popup-btn" onClick={() =>  setSended(false)}>Oke</button>
                    </div>
                </div>
            }
            <div className="overtime-title">
                <h2>Form Overtime</h2>
                <h3>HRGA Dept.</h3>
            </div>
            
            <form onSubmit={handleForm}>
                <label htmlFor="name" className="form-title">Nama</label><br />
                <select id="name" name="name" defaultValue={'DEFAULT'} required>
                    <option value="DEFAULT" disabled>Pilih Nama</option>
                    {
                        member.map(mp => {
                            return <option key={mp.nama} value={mp.nama}>{mp.nama}</option>
                        })
                    }
                </select><br />
                
                <label className="form-title">Jam Lembur</label>
                <select id="name" name="name" defaultValue=0 required>
                    <option value="0" disabled>0 Jam</option>
                    <option value="1">1 Jam</option>
                    <option value="2">2 Jam</option>
                    <option value="3">3 Jam</option>
                    <option value="4">4 Jam</option>
                    <option value="5">5 Jam</option>
                    <option value="6">6 Jam</option>
                    <option value="7">7 Jam</option>
                    <option value="8">8 Jam</option>
                    <option value="9">9 Jam</option>
                    <option value="10">10 Jam</option>
                </select><br />
                
                <label className="form-title" htmlFor="job">Deskripsi Pekerjaan</label>
                <textarea name="job" id="job" placeholder="Ketik pekerjaan" rows="2" required />

                <label className="form-title" htmlFor="date">Tanggal</label><br />
                <input type="date" name="date" id="date" defaultValue={fullDate}/>

                <button className="form-button">Submit</button>
            </form>
                
        </section>
    )
}

export default Overtime;
