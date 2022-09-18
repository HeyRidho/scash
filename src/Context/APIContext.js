// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const APIContext = createContext();

// export function APIProvider({ children }) {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//       axios.get('http://localhost:8000/data/karyawan')
//       .then(response => setData(response))
//       .catch(error => console.log(error.message))
//     }, []);

//     return(
//         <APIContext.Provider value={{data}}>
//             {children}
//         </APIContext.Provider>
//     )
// }

// export default APIContext;