const apikey = "6970e727f1c6bdf5a659ea2765accbbe";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";


$(document).ready(function()
{
  clock();
  setInterval(clock,10);
});

const  dy = document.querySelector(".day");
const  dat = document.querySelector(".date");
const time = document.querySelector(".time");
const cname = document.querySelector(".cityname");
const temp = document.querySelector(".temp");
const humiditytxt = document.querySelector(".humidity-txt");
const windtxt = document.querySelector(".wind-txt");
const wimages = document.querySelector(".wimages");
const wcondition = document.querySelector(".wcondition");
const  searchbox = document.querySelector(".searchbox");
const  clickbtn = document.querySelector(".click-btn");
const  pagenotfound = document.querySelector(".pagenotfound");
const  searchcity = document.querySelector(".searchcity");
const  weatherinfo = document.querySelector(".weatherinfo");
const  forecastedetails = document.querySelector(".forecaste");

 function clock() 
 {
    var date = new Date();
    const dayname = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const monthname = ["Jan","Feb","Mar","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    //getMonth(); it return month in no so , we make a arrya and same as getDay() function

    //Sat , 4 Sep 2024  02:09 PM
      
    var day = dayname[date.getDay()];
    var month =  monthname[date.getMonth()-1] ;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
     var dt = date.getDate();
    var ampm = hours >=12 ? 'PM' : 'AM' ;
    hours = hours % 12 || 12 ;  // 12 hours formate
    hours = hours < 10 ? '0' + hours : hours ;  // 02 and 12 
    minutes = minutes < 10 ? '0' + minutes : minutes ;
   var d = dt + " " + month + " " + year ;
   var hr  = hours + ":"+ minutes +" "+ ampm ;
   dy.textContent = day + ",";
   dat.textContent=d ;
   time.textContent=hr;
}

// weather information

async function fetchweatherdata(city)
{

  const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if(response.status ==404)
    {
      pagenotfound.style.display ="block";
      searchcity.style.display ="none";
      weatherinfo.style.display ="none";
    }




else{

  var weatherdata = await response.json();
  cname.innerHTML = weatherdata.name;
  temp.innerHTML=  Math.round(weatherdata.main.temp ) + " " +"℃";
  humiditytxt.innerHTML=  weatherdata.main.humidity + "%";
  windtxt.innerHTML=  weatherdata.wind.speed + " " + "m/s";
  if(weatherdata.weather[0].main=="Rain")
  {
    wimages.src="images/thundersc.png";
    wcondition.innerHTML = "Rain";
  }
  else if(weatherdata.weather[0].main=="Clouds")
    {
      wimages.src="images/clouds.png";
      wcondition.innerHTML = "Clouds";
    }
    else if(weatherdata.weather[0].main=="Drizzle")
      {
        wimages.src="images/drizzle.png";
        wcondition.innerHTML = "Drizzle";
      }
      else if(weatherdata.weather[0].main=="Haze")
        {
          wimages.src="images/haze.png";
          wcondition.innerHTML = "Haze";
        }
        else if(weatherdata.weather[0].main=="Mist")
          {
            wimages.src="images/mist.png";
            wcondition.innerHTML = "Mist";
          }
          else if(weatherdata.weather[0].main=="Fog")
            {
              wimages.src="images/fog.png";
              wcondition.innerHTML = "Foggy";
            }
            else if(weatherdata.weather[0].main=="Snow")
              {
                wimages.src="images/snow.png";
                wcondition.innerHTML= "Snow";
              }
              else if(weatherdata.weather[0].main=="Clear")
                {
                  wimages.src="images/clearcloud.png";
                  wcondition.innerHTML = "Clear";
                }
                pagenotfound.style.display ="none";
                searchcity.style.display ="none";
                weatherinfo.style.display ="block";

}
}


// forecaste details


     async function fetchforecastedata(city)
{

  const response = await fetch(apiURL + city + `&appid=${apikey}`);
 var forecastedt = await response.json();
  const ftime = ' 12:00:00';
 const fdate = new Date().toISOString().split('T')[0];   

 forecastedetails.innerHTML = '';

 forecastedt.list.forEach(forecastedt => {

  if( forecastedt.dt_txt.includes(ftime) && !forecastedt.dt_txt.includes(fdate) ) 
    {
 updateforcastedata( forecastedt);
}
 });

}


function getWeatherIcon(id)
{
    if(id<= 232 )  return 'thundersc.png';
    if(id<= 321 )  return 'drizzle.png';
    if(id<= 531 )  return 'thundersc.png';
    if(id<= 622)  return 'snow.png';
    if(id<= 781 )  return 'haze.png';
    if(id<= 800 )  return  'clearcloud.png';

    else   return    'clouds.png';

}

function updateforcastedata(forcateinfodetails)
{

console.log(forcateinfodetails);
const {
 dt_txt : date,
 weather :[{id}],
 main : {temp},

  }=forcateinfodetails;

 let dat = new Date(forcateinfodetails.dt*1000);
 const daydate = dat.getDate();
 const monthname = [ "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","dec"];
  var mname = monthname[dat.getMonth()];

 const weattherforcatedata = 
              `<div class="forecasteinfo">
                <h4 class="forecasteday"> ${daydate} ${mname}</h4>
                <h4 class="forecastetemp"> ${Math.round(temp)} ℃</h4>
                <img src="images/${getWeatherIcon(id)}" class="forecasteimg">
               </div>`  ;

                 forecastedetails.insertAdjacentHTML('beforeend' , weattherforcatedata);   


}




clickbtn.addEventListener("click",() =>
{
  fetchweatherdata(searchbox.value);
 fetchforecastedata(searchbox.value);
});
  
