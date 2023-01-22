
const test = (req, res) => {
    //vehicle top speed
    bikeTopSpeed = 10;
    tuktukTopSpeed = 12
    carTopSpeed = 20 

    //weather conditions
    sunnyWeather = 0.1
    rainyWeahter = 0.2
    windy = 0

    const {inputWeather} = req.body
    const {inputOrbit1Speed} = req.body
    const {inputOrbit2Speed} = req.body

    if(inputWeather == "sunny"){
        //-10% craters

    }else if(inputWeather == "rainyWeahter"){
        //+20% craters

    }else if(inputWeather == "windy"){
        //+0% craters

    }else{
        res.status(404).json("Please specify a weather a condition")
    }







    res.status(200).json("controller works")
};






module.exports = {
    test,
}