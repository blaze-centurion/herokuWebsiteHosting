const submitBtn = document.getElementById('submitBtn');
const searchBox = document.getElementById('cityName');
const cityName = document.getElementById('city_name');
const curDay = document.getElementById('day');
const curDate = document.getElementById('today_date');

const temp = document.getElementById('temp');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');


const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = searchBox.value;

    if(cityVal === ""){
        cityName.innerHTML = "This field must be filled";
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=417b392cbeed8f5d242b24671e98b9db`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(data);

            cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMod = arrData[0].weather[0].main;

            if(tempMod == "Clear"){
                temp_status.innerHTML = "<i class='fa fa-sun-o' style = 'color: #eccc68;'></i>";
            }
            else if(tempMod == "Clouds"){
                temp_status.innerHTML = "<i class='fa fa-cloud' style='color: #f1f2f6;'></i>"
            }
            else if(tempMod == "Rain"){
                temp_status.innerHTML = "<i class='fa fa-cloud-rain' style='color: #a4b0be;'></i>"
            }
            else{
                temp_status.innerHTML = "<i class='fa fa-cloud' style='color: #f1f2f6;'></i>"
            }

        }
        catch{
            cityName.innerText = "Plz Enter City Name Properly";
        }
    }
}

submitBtn.addEventListener('click', getInfo);


const getCurrentDay = () => {
    var weekDay = new Array(7);
    weekDay[0] = "Mon";
    weekDay[1] = "Tue";
    weekDay[2] = "Wed";
    weekDay[4] = "Thur";
    weekDay[5] = "Fri";
    weekDay[6] = "Sat";
    weekDay[7] = "Sun";

    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()];
    return day;
}

const getCurrentTime = () => {
    var months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ]
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();


    return `${month} ${date}`;
}

curDate.innerHTML = getCurrentDay();
curDay.innerHTML = getCurrentTime();