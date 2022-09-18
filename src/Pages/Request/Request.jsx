import axios from "axios";
import "./Request.css";

const Request = () => {

    function handleForm(e) {
        e.preventDefault();

        const from = e.target.name.value;
        const subject = e.target.subject.value;
        const description = e.target.description.value;

        axios.post('http://192.168.103.215:8000/api/request', {from, subject, description})
        .then(res => e.target.reset()).catch(err => console.log(err))
    }


    return (
        <section id="request">
            <div className="request-title">
                <h2>Request to HR</h2>
            </div>
            
            <form onSubmit={handleForm}>
                <label className="form-title" htmlFor="name">From</label><br />
                <input type="text" id="name" name="name" placeholder="Nama" required /><br />
                
                <label className="form-title" htmlFor="subject">Subjek</label><br />
                <input type="text" id="subject" name="subject" placeholder="Subjek"/><br />  
                
                <label className="form-title" htmlFor="description">Deskripsi / Keterangan</label>
                <textarea name="description" id="description" placeholder="Ketik pekerjaan" rows="8" required />

                <button className="form-button">Submit</button>
            </form>
                
        </section>
    )
}

export default Request;