import { useState } from "react";
import axios from "axios";
import "./UpahAneka.css";

const UpahAneka = () => {

    const [upahAneka, setUpahAneka] = useState(0);
    const [jenisUpahAneka, setJenisUpahAneka] = useState("");
    const [dataEmployee, setDataEmployee] = useState({
        nip: "Belum ada data",
        nama: "Belum ada data",
        status: "Belum ada data",
        bagian: "Belum ada data"
    });
    const [timer, setTimer] = useState(null)

    const [loading, setLoading] = useState(false);
    const [sended, setSended] = useState(false);

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    function upahAnekaValue(jenis) {
        setJenisUpahAneka(jenis)
            switch (jenis) {
                case "Pernikahan":
                    dataEmployee.status === "KONTRAK" ? setUpahAneka(696220/2) : setUpahAneka(696220)
                    break
                case "Kelahiran":
                    setUpahAneka(437651)
                    break
                case "Khitan":
                    setUpahAneka(535550)
                    break
                default:
                    setUpahAneka(0)
                    break
            }
        }

    function checkEmployee(nik) {
        clearTimeout(timer)

        const newTimer = setTimeout(async () => {
            const data = await axios.get(`https://gray-sleepy-fish.cyclic.app/api/data/${nik}`)
            console.log(data.data)
            setDataEmployee(data.data)
        }, 1000)

        setTimer(newTimer)
        
    }

    function handleForm(e) {
        setLoading(true);
        e.preventDefault();

        const name = e.target.name.value;
        const hour = e.target.hour.value;
        const job = e.target.job.value;
        const date = e.target.date.value;

        axios.post('https://gray-sleepy-fish.cyclic.app/api/overtime', {name, hour, job, date})
        .then(res => {
            setSended(true)
            setLoading(false)
            e.target.reset()
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
                <h2>Form Upah Aneka</h2>
                <h3>HRGA Dept.</h3>
            </div>
            
            <form onSubmit={handleForm}>
                <label htmlFor="name" className="form-title">NIK</label><br />
                <input type="text" name="nik" id="nik" placeholder="Masukkan NIK" onChange={(e) => checkEmployee(e.target.value)} required/>
                
                <label htmlFor="name" className="form-title">Nama</label><br />
                <input type="text" name="nama" id="nama" value={dataEmployee.nama} disabled/>

                <label htmlFor="name" className="form-title">Bagian</label><br />
                <input type="text" name="bagian" id="bagian" value={dataEmployee.bagian} disabled/>

                <label htmlFor="name" className="form-title">Status</label><br />
                <input type="text" name="status" id="status" value={dataEmployee.status} disabled/>

                <label className="form-title">Upah Aneka</label>
                <select id="hour" name="hour" defaultValue={'none'} onChange={(e) => {dataEmployee.nama !== "Belum ada data" && upahAnekaValue(e.target.value)} } required>
                    <option value="none" disabled>Pilih Upah Aneka</option>
                    <option value="Pernikahan" >Pernikahan</option>
                    <option value="Kelahiran" >Kelahiran</option>
                    <option value="Khitan" >Khitan</option>
                    <option value="Sakit" >Sakit</option>
                    <option value="Kedukaan" >Kedukaan</option>
                    <option value="Belum Ada Nilai" >Bencana Alam</option>
                </select><br />

                { jenisUpahAneka === "Pernikahan" && <>
                <input type="checkbox" name="pernikahan" id="pernikahan" onChange={(e) => {
                    if(e.target.checked) {
                        setUpahAneka(upahAneka/2)
                    } else {
                        upahAnekaValue("Pernikahan")
                    }
                }} />
                <label htmlFor="pernikahan" className="form-title">Pernikahan Kedua (Istri pertama meninggal dunia)</label><br />
                </> }

                <label htmlFor="name" className="form-title">Nilai</label><br />
                <input type="text" name="nik" id="nik" placeholder="Masukkan NIK" value={upahAneka ? formatter.format(upahAneka) : "Harap masukkan NIK terlebih dahulu"} required disabled/>                

                <label className="form-title" htmlFor="date">Tanggal Peristiwa</label><br />
                <input type="date" name="date" id="date" required />

                <button className="form-button" disabled={loading} >Submit</button>
            </form>
                
        </section>
    )
}

export default UpahAneka;
