import { member } from "./member";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Overtime.css";
import { Backdrop, Snackbar, Alert, CircularProgress, TextField, Autocomplete, InputLabel, MenuItem, FormControl, Select, Stack, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Send } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Overtime = () => {
    const [name, setName] = useState('');
    const [hour, setHour] = useState('');
    const [pickup, setPickup] = useState('Tidak');
    const [job, setJob] = useState('');
    const [open, setOpen] = useState(false);
    const [openBar, setOpenBar] = useState(false);
    const [openBarFail, setOpenBarFail] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenBar(false);
    };

    const handleCloseFail = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenBarFail(false);
    };
    
    const handleOT = (event) => {
        setHour(event.target.value);
    };
    
    const handlePickup = (event) => {
        setPickup(event.target.value);
    };
    
    let dated = new Date()
    let day = dated.getDate();
    let month = dated.getMonth() + 1;
    let year = dated.getFullYear();
    
    if (month < 10) {
        month = '0' + month
    }

    if (day < 10) {
        day = '0' + day
    }
    
    let fullDate = `${year}-${month}-${day}`;
    const [dateValue, setDateValue] = useState(dayjs(fullDate));

    function sendData(e) {
        setOpen(true);
        if(name && dateValue && pickup && job) {
            axios.post(`https://hr-development-1f9af-default-rtdb.firebaseio.com/dailyovertime.json?auth=DoXyCDrEkmJzPn5RuGZu74QdqyJuhO1NzC2bAgWu`, { name: name.label, hour, job, date: dateValue.format('DD-MM-YYYY'), pickup })
            .then(res => {
                setOpen(false);
                setOpenBar(true);
            }).catch(err => {
                setOpen(false);
                setOpenBarFail(true);
                console.log(err)
            })
        } else {
            setOpen(false);
            setOpenBarFail(true);
        }
    }

    function resetForm() {
        setJob('');
        setHour('');
        setPickup('');
    }


    return (
        <section id="overtime">
            <div className="overtime-form" style={{width: "100%", maxWidth: 640, margin: "auto"}}>
                <Typography variant="h5" align="center" fontWeight="bold" mb={5}>
                Form Overtime HRGA
                <Typography variant="body2" >
                Lihat data Overtime disini : <Link to="/dataovertime">Overtime</Link>
                </Typography>
                </Typography>
                <Autocomplete
                fullWidth
                style={{marginBottom: 20}}
                disablePortal
                id="combo-box"
                options={member}
                onChange={(event, value) => {
                    setName(value);
                    member.filter(member => member === value ? setPickup(member.jemputan) : console.log(value));
                }}
                renderInput={(params) => <TextField {...params} label="Pilih Nama" />}
                />

                <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    format="DD/MM/YYYY"
                    label="Tanggal"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    />
                </LocalizationProvider><br />
                </Stack>

                <Stack direction="row" spacing={1}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Overtime</InputLabel>
                    <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={hour}
                    label="Overtime"
                    onChange={handleOT}
                    >
                    <MenuItem value={0}>Teiji</MenuItem>
                    <MenuItem value={1}>1 Jam</MenuItem>
                    <MenuItem value={2}>2 Jam</MenuItem>
                    <MenuItem value={3}>3 Jam</MenuItem>
                    <MenuItem value={4}>4 Jam</MenuItem>
                    <MenuItem value={5}>5 Jam</MenuItem>
                    <MenuItem value={6}>6 Jam</MenuItem>
                    <MenuItem value={7}>7 Jam</MenuItem>
                    <MenuItem value={8}>8 Jam</MenuItem>
                    <MenuItem value={9}>9 Jam</MenuItem>
                    <MenuItem value={10}>10 Jam</MenuItem>
                    <MenuItem value={11}>11 Jam</MenuItem>
                    <MenuItem value={12}>12 Jam</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Jemputan</InputLabel>
                    <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    value={pickup}
                    label="Jemputan"
                    onChange={handlePickup}
                    >
                    <MenuItem value={"Tidak"}>Tidak</MenuItem>
                    <MenuItem value={"Bekasi Barat"}>Bekasi Barat</MenuItem>
                    <MenuItem value={"Cawang"}>Cawang</MenuItem>
                    <MenuItem value={"Timur"}>Timur</MenuItem>
                    <MenuItem value={"Bogor"}>Bogor</MenuItem>
                    <MenuItem value={"Cikarang"}>Cikarang</MenuItem>
                    </Select>
                </FormControl>
                </Stack><br />

                <TextField
                fullWidth
                style={{marginBottom: 30}}
                id="outlined-multiline-static"
                label="Pekerjaan"
                multiline
                rows={4}
                value={job}
                onChange={(e) => setJob(e.target.value)}
                />

                <Stack direction="row" spacing={1}>
                    <Button  fullWidth style={{height: 50}} onClick={(e) => resetForm()}>
                        RESET
                    </Button>
                        <Button variant="outlined" fullWidth onClick={(e) => sendData()} style={{height: 50}}>
                        KIRIM
                        </Button>
                </Stack>
                <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Snackbar open={openBar} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Terimakasih, Data sudah terkirim
                    </Alert>
                </Snackbar>
                
                <Snackbar open={openBarFail} autoHideDuration={6000} onClose={handleCloseFail}>
                    <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
                    Harap lengkapi data terlebih dahulu
                    </Alert>
                </Snackbar>
                </div>
            </div>
        </section>
    )
}

export default Overtime;
