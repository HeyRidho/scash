import { useEffect, useState } from "react";
import axios from "axios";
import "./Overtime.css";
import { Stack, Typography, Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Overtime = () => {
    const [dataOvertime, setDataOvertime] = useState(null);

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
    const [open, setOpen] = useState(true);

    useEffect(() => {
        getOvertime(dateValue)
    }, [dateValue])

    function getOvertime(e) {
        axios.get('https://hr-development-1f9af-default-rtdb.firebaseio.com/dailyovertime.json?auth=DoXyCDrEkmJzPn5RuGZu74QdqyJuhO1NzC2bAgWu')
        .then(res => {
            setOpen(false);
            let dataOt = [];
            Object.values(res.data).map((item) => {
                const date1 = e.format('DD-MM-YYYY')
                const date2 = item.date;
                if(date1 === date2) {
                    dataOt.push(item)
                }
                return console.log('pushed')
            })
            setDataOvertime(dataOt)

        }).catch(err => {
            setOpen(false);
        })
    }

    return (
        <section id="overtime">
            <div className="overtime-form" style={{width: "100%", maxWidth: 640, margin: "auto"}}>
                <Typography variant="h5" align="center" fontWeight="bold" mb={5}>
                Data Overtime HRGA
                </Typography>

                <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    format="DD/MM/YYYY"
                    label="Pilih Tanggal"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    />
                </LocalizationProvider><br />
                </Stack>

                <table style={{width: "100%", fontSize: 12, border: "1px solid gray", borderCollapse: "collapse", color: "black"}}>
                    <tr key="head">
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>No.</strong></td>
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>Nama</strong></td>
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>Jam</strong></td>
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>Pekerjaan</strong></td>
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>Jemputan</strong></td>
                        <td style={{width: "fit-content",padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}  align="center"><strong>Tanggal</strong></td>
                    </tr>
                {
                    dataOvertime && dataOvertime.map((item, index) => {
                        return(
                            <tr key={item._id} style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}} align="center">{index + 1}</td>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}>{item.name}</td>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}} align="center">{item.hour}</td>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}}>{item.job}</td>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}} align="center">{item.pickup}</td>
                                <td style={{padding: 3, border: "1px solid gray", borderCollapse: "collapse"}} align="center">{item.date}</td>
                        </tr>)
                    })
                }
                </table>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </section>
    )
}

export default Overtime;
