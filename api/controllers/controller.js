
const findBest = (req, res) => {
    const {inputWeather} = req.body
    const {inputOrbit1Speed} = req.body
    const {inputOrbit2Speed} = req.body
    if(inputOrbit1Speed<=0 || inputOrbit1Speed==NaN){
        res.status(409).json('Please enter a valid number for inputOrbit1Speed');

    }
    if(inputOrbit2Speed<=0 || inputOrbit2Speed==NaN){
        res.status(409).json('Please enter a valid number for inputOrbit2Speed');
    }


    //orbit distance
    orbit1Distance = 18
    orbit2Distance = 20

    //orbit craters
    orbit1Craters = 20
    orbit2Craters = 10

    //vehicle top speed
    bikeTopSpeed = 10;
    tuktukTopSpeed = 12;
    carTopSpeed = 20;

    //vehicle time(minutes) to cross a 1 crater
    bikeTime = 2;
    tuktukTime = 1;
    carTime = 3;

    //weather conditions
    sunnyWeather = 0.9;
    rainyWeahter = 0.8;
    windyWeather = 1;

    bikeSpeedOrbit1 = inputOrbit1Speed
    tuktukSpeedOrbit1 =inputOrbit1Speed
    carSpeedOrbit1 = inputOrbit1Speed

    bikeSpeedOrbit2 = inputOrbit2Speed
    tuktukSpeedOrbit2 =inputOrbit2Speed
    carSpeedOrbit2 = inputOrbit2Speed

    //disqualify vehicle on orbit1
    bikeDisqualifyOrbit1 = 1;
    tuktukDisqualifyOrbit1 = 1
    carDisqualifyOrbit1 = 1

    //disqualify vehicle on orbit1
    if(bikeSpeedOrbit1 > bikeTopSpeed){
        bikeDisqualifyOrbit1=0;
    }
    if(tuktukSpeedOrbit1 > tuktukTopSpeed ){
        tuktukDisqualifyOrbit1=0;
    }
    if(carSpeedOrbit1 >carTopSpeed){
        carDisqualifyOrbit1=0;
    }

    //disqualify vehicle on orbit2
    bikeDisqualifyOrbit2 = 1;
    tuktukDisqualifyOrbit2 = 1
    carDisqualifyOrbit2 = 1

     //disqualify vehicle on orbit2
     if(bikeSpeedOrbit2 > bikeTopSpeed){
        bikeDisqualifyOrbit2=0;
    }
    if(tuktukSpeedOrbit2 > tuktukTopSpeed ){
        tuktukDisqualifyOrbit2=0;
    }
    if(carSpeedOrbit2 >carTopSpeed){
        carDisqualifyOrbit2=0;
    }

    //weather conditions
    if(inputWeather == "sunny"){
        orbit1CraterCalc = orbit1Craters*sunnyWeather
        orbit2CraterCalc= orbit2Craters*sunnyWeather
    }
    else if(inputWeather == "rainy"){
        //+20% craters
        orbit1CraterCalc = orbit1Craters*rainyWeahter
        orbit2CraterCalc= orbit2Craters*rainyWeahter

    }else if(inputWeather == "windy"){
        //+0% craters
        orbit1CraterCalc = orbit1Craters*windyWeather
        orbit2CraterCalc= orbit2Craters*windyWeather

    }else{
        res.status(404).json("Please specify a weather a condition")
    }



    //time calculation on orbit 1
    calculationsOrbit1 ={
        bike : (orbit1Distance/(bikeSpeedOrbit1/60)+(orbit1CraterCalc*bikeTime))*bikeDisqualifyOrbit1,
        tuktuk : ((orbit1Distance/(tuktukSpeedOrbit1/60))+(orbit1CraterCalc*tuktukTime))*tuktukDisqualifyOrbit1,
        car : (orbit1Distance/(carSpeedOrbit1/60)+(orbit1CraterCalc*carTime))*carDisqualifyOrbit1,
    }

    //time calculation on orbit 2
    calculationsOrbit2 ={
        bike : (orbit2Distance/(bikeSpeedOrbit2/60)+(orbit2CraterCalc*bikeTime))*bikeDisqualifyOrbit2,
        tuktuk : ((orbit2Distance/(tuktukSpeedOrbit2/60))+(orbit2CraterCalc*tuktukTime))*tuktukDisqualifyOrbit2,
        car : (orbit2Distance/(carSpeedOrbit2/60)+(orbit2CraterCalc*carTime))*carDisqualifyOrbit2,
    }

    //convert objects to arrays
    Orbit1Array = [];
    Orbit2Array = [];

    Orbit1Array.push(calculationsOrbit1.bike)
    Orbit1Array.push(calculationsOrbit1.tuktuk)
    Orbit1Array.push(calculationsOrbit1.car)

    Orbit2Array.push(calculationsOrbit2.bike)
    Orbit2Array.push(calculationsOrbit2.tuktuk)
    Orbit2Array.push(calculationsOrbit2.car)

    //find the minimum take taken to travel
    orbit1Minimum = Math.min.apply(null, Orbit1Array.filter(Boolean));
    orbit1MinimumIndex= Orbit1Array.indexOf(orbit1Minimum)

    orbit2Minimum = Math.min.apply(null, Orbit2Array.filter(Boolean));
    orbit2MinimumIndex= Orbit2Array.indexOf(orbit2Minimum)
    

    //find the best orbit and best vehicle for commute.
    bestOrbit="";
    bestTransport =0


    if(Orbit1Array[orbit1MinimumIndex]<Orbit2Array[orbit2MinimumIndex]){
        bestOrbit=1
        if(orbit1MinimumIndex==0){
            bestTransport = "bike"
        }else if(orbit1MinimumIndex==1){
            bestTransport="tuktuk"
        }
        else if(orbit1MinimumIndex==2){
            bestTransport = "car"
        }
    }else{
        bestOrbit=2
        if(orbit2MinimumIndex==0){
            bestTransport = "bike"
        }else if(orbit2MinimumIndex==1){
            bestTransport = "tuktuk"
        }
        else if(orbit2MinimumIndex==2){
            bestTransport = "car"
        }
    }

    //response
    res.status(200).json("Vehicle "+bestTransport+" on Orbit "+ bestOrbit );

};

module.exports = {
    findBest,
}