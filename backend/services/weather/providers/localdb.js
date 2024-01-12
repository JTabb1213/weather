var _ = require('lodash');
const db = require("../../../models");
const sequelize = db.sequelize;
db.city = require("../../../models/city.model.js")(sequelize, db.Sequelize);
const City = db.city;

async function queryWeather(city) {
    console.log("city: ", city);
    const result = await City.findOne({ where: { name: city } });
    if (!result) {
        return null;
    }
    return {
        name: result.dataValues.name,
        tempActual: result.dataValues.tempActual,
        humidity: result.dataValues.humidity,
        windSpeed: result.dataValues.windSpeed,
        tempFeelsLike: result.dataValues.tempFeelsLike,
        skies: result.dataValues.skies
    }
}

async function createCity(cityData) {
    try {
        const result = await City.create(cityData);
        console.log("data added successfuly:");
        return result;
    } catch (error) {
        console.error("error adding data: ", error);
    };
}

async function getWeather(cityId) {
    try {
        const result = await City.findOne({ where: { id: cityId } });
        console.log("city was found");
        return result;
    } catch (error) {
        console.error("error finding city id");
    }
}

async function deleteWeather(cityId) {
    try {
        const result = await City.destroy({ where: { id: cityId } });
        console.log("city was deleted");
        return result;
    } catch (error) {
        console.error("error finding city id");
    }
}

async function updateWeather(cityId, cityData) {
    try {
        const result = await City.update(cityData, {
            where: { id: cityId },
        });
        return result;
    } catch (error) {
        console.log("error during update", error);
    }
}

async function patchWeather(cityId, cityData) {
    try {
        const oldCity = getWeather(cityId);

        const newCityData = _.merge(oldCity.dataValues, cityData);
        const newCity = updateWeather(cityId, newCityData);

        return newCity;
    } catch (error) {
        console.error("error patching city, ", error);
    }
}

module.exports = {
    queryWeather: queryWeather,
    createCity: createCity,
    getWeather: getWeather,
    deleteWeather: deleteWeather,
    updateWeather: updateWeather,
    patchWeather: patchWeather
}


