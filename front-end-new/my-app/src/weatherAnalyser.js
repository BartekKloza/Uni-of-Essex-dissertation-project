export function createResponse(weatherData, selectedDate, selectedActivity, userSettings) {
    let windSpeed;
    let precipProbability;
    let temperature;
    let result = '';

    // in case these fields are not in the response set values to 0
    if(weatherData.windSpeed===undefined)
        windSpeed = -99;
    else
        windSpeed = weatherData.windSpeed;

    if(weatherData.precipProbability===undefined)
        precipProbability=-99;
    else
        precipProbability=weatherData.precipProbability;
    // temperature not defined 
    if(weatherData.temperature===undefined)
        temperature=-99;
    else
        temperature=weatherData.temperature;
    
        // if user is not logged in - apply default settings to search

    // golf -> sailing -> horses
    // temperature, windspeed, chanceofrain x3
    // negative result if wind is too fast or chance of rain is too big to play golf
    if(selectedActivity==="Golf"){
        if(windSpeed > userSettings[1] || precipProbability > userSettings[2] || temperature < userSettings[0]){
            result = "No, you should not play golf on " + 
            selectedDate.toLocaleString() + ".";
            if(windSpeed > userSettings[1]){
                result += " The wind will be too strong at " + windSpeed+ " Mph."
            }
            if(precipProbability > userSettings[2]){
                result += " There is a " + precipProbability*100 + "% chance of rain predicted during these times. ";
            }
            if(temperature < userSettings[0]){
                result += "Temperature will be too low - only" + temperature + " degrees";
            }
        }
        // else positive result
        else{
            result = "Yes, " +selectedDate.toLocaleString() + 
            " looks like a good time to play golf. ";
            if(windSpeed===-99){
                result += "Weatherbe was unable to find wind speed data.";
            }
            else{
                result += "Wind speed is going to be " + windSpeed + " Mph. ";
            }
            if(precipProbability===-99){
                result += "Weatherbe was unable to find precipitation probability data.";
            }
            else{
                result += "Chance of rain is going to be " + precipProbability*100 + "%. ";
            }
            if(temperature===-99){
                result += "Weatherbe was unable to find temperature data.";
            }
            else{
                result += "Temperature is going to be " + temperature + " degrees "; 
            }
        }
    }
    
    if(selectedActivity==="Windsurfing/Sailing"){
        if(windSpeed > userSettings[4] || precipProbability > userSettings[5] || temperature < userSettings[3]){
            result = "No, you should not do windsurfing or sailing on " + 
            selectedDate.toLocaleString() + ".";
            if(windSpeed > userSettings[4]){
                result += " The wind will be too strong at " + windSpeed+ " Mph."
            }
            if(precipProbability > userSettings[5]){
                result += " There is a " + precipProbability*100 + "% chance of rain predicted during these times. ";
            }
            if(temperature < userSettings[3]){
                result += "Temperature will be too low - only" + temperature + " degrees";
            }
        }
        // else positive result
        else{
            result = "Yes, " +selectedDate.toLocaleString() + 
            " looks like a good time to play do windsurfing or sailing. ";
            if(windSpeed===-99){
                result += "Weatherbe was unable to find wind speed data.";
            }
            else{
                result += "Wind speed is going to be " + windSpeed + " Mph. ";
            }
            if(precipProbability===-99){
                result += "Weatherbe was unable to find precipitation probability data.";
            }
            else{
                result += "Chance of rain is going to be " + precipProbability*100 + "%. ";
            }
            if(temperature===-99){
                result += "Weatherbe was unable to find temperature data.";
            }
            else{
                result += "Temperature is going to be " + temperature + " degrees "; 
            }
        }
    }

    // golf -> sailing -> horses [6,7,8]
    // temperature, windspeed, chanceofrain x3
    if(selectedActivity==="Horses"){
        if(windSpeed > userSettings[7] || precipProbability > userSettings[8] || temperature < userSettings[6]){
            result = "You should keep your horses inside today/tonight " + 
            selectedDate.toLocaleString() + ".";
            if(windSpeed > userSettings[6]){
                result += " The wind will be too strong at " + windSpeed+ " Mph."
            }
            if(precipProbability > userSettings[7]){
                result += " There is a " + precipProbability*100 + "% chance of rain predicted during these times. ";
            }
            if(temperature < userSettings[8]){
                result += "Temperature will be too low - only" + temperature + " degrees";
            }
        }
        // else positive result
        else{
            result = "Yes, " +selectedDate.toLocaleString() + 
            " looks like a good time for horses to stay outside. ";
            if(windSpeed===-99){
                result += "Weatherbe was unable to find wind speed data.";
            }
            else{
                result += "Wind speed is going to be " + windSpeed + " Mph. ";
            }
            if(precipProbability===-99){
                result += "Weatherbe was unable to find precipitation probability data.";
            }
            else{
                result += "Chance of rain is going to be " + precipProbability*100 + "%. ";
            }
            if(temperature===-99){
                result += "Weatherbe was unable to find temperature data.";
            }
            else{
                result += "Temperature is going to be " + temperature + " degrees "; 
            }
        }
    }
    
    return result;
}