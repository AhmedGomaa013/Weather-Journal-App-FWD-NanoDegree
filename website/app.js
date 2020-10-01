/* Global Variables */
const apiKey = "&appid=c6e75c085d3c63aedf5936837f13c070";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";

//OpenWeatherMap Api
//api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}


//Helper Functions
const post = async (url='',data={}) =>{
    const res = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });

    try
    {
        return res;
    }
    catch
    {
        console.log("Error");
    }
}

const getEntry = async ()=>{
    const res = await fetch('all');
    const returnRes = await res.json();
    return returnRes;
}

const updateUI = function(data={}){
    let temp = document.querySelector('#date');
    temp.textContent = data.date;

    temp = document.querySelector('#temp');
    temp.textContent = data.temperature;

    temp = document.querySelector('#content');
    temp.textContent = data.user_response;
}

//Events
function DomLoaded()
{
    let btn = document.querySelector('button');
    btn.addEventListener('click',ButtonPressed);
}

async function ButtonPressed()
{
    const zip = document.querySelector('#zip').value;
    const res = await fetch(baseUrl+zip+apiKey);

    try
    {
        const newRes = await res.json();

        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        
        let text = document.querySelector('#feelings').value;
        
        let data = {
            'temperature':newRes.main.feels_like,
            'date':newDate,
            'user_response':text};
        
        const postRes = post('/entry',data);
        
        const entry = await getEntry();
        
        updateUI(entry);
    }
    catch
    {
        console.log("Error");
    }
}

//Main Code
document.addEventListener('DOMContentLoaded',DomLoaded);