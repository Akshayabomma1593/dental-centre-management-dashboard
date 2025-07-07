import React,{createContext, useEffect, useState} from "react";
//create context
export const AppContext =  createContext();
export const AppProvider = ({children}) => {
    const [patients, setPatients] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [theme, setTheme] = useState("light");
   //load theme from localStorage
    useEffect(() =>{
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.className = savedTheme;
    }, []);

    //toggle between light/dark
    const toggleTheme = ()=>{
        const newTheme =  theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.className = newTheme;
    };

    //load from local storage once on app start
    useEffect(() =>{
        const localPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        const localIncidents = JSON.parse(localStorage.getItem("incidents") || "[]");

        if(localPatients.length&&localIncidents.length){
            setPatients(localPatients);
            setIncidents(localIncidents);
        }
        else{
            const fetchData = async()=>{
                try{
                  const pRes = await fetch("/data/patients_data.json");
                  const iRes = await fetch("/data/incidents_data.json");
                  const pData = await pRes.json();
                  const iData = await iRes.json();
                  localStorage.setItem("patients", JSON.stringify(pData));
                  localStorage.setItem("incidents", JSON.stringify(iData));
                  setPatients(pData);
                  setIncidents(iData);
                }
                catch(err){
                    console.error("Failed to load fallback data:", err);
                }
            };
            fetchData();
        }
     }, []
    );

    useEffect(()=> {
        localStorage.setItem("patients", JSON.stringify(patients));
    }, [patients]);

    useEffect(()=> {
        localStorage.setItem("incidents", JSON.stringify(incidents));
    }, [incidents]);

    const addIncident = (incident) => {
            const updated = [...incidents, incident];
            setIncidents(updated);
            localStorage.setItem('incidents',JSON.stringify(updated));
        };

    return(
        <AppContext.Provider
         value = {{
            patients,
            setPatients,
            incidents,
            setIncidents,
            addIncident,
            theme,
            toggleTheme}}>
        <div className={`app-container ${theme}`}>
        {children}
        </div>
        </AppContext.Provider>
    );

};
export default AppProvider;