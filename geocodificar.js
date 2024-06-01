const axios = require('axios');

const geocodificar = async (ubicacion) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(ubicacion)}.json?access_token=${process.env.MAPBOX_TOKEN}`;

    try {
        const respuesta = await axios.get(url);
        if (respuesta.data.features.length === 0) {
            throw new Error('Ubicación no encontrada');
        }
        const [longitud, latitud] = respuesta.data.features[0].geometry.coordinates;
        return { latitud, longitud };
    } catch (error) {
        throw new Error('No se puede conectar al servicio');
    }
}

module.exports = geocodificar;