import amadeus from "../index"

const getFlightController = async (req, res) => {
    try {
        const {from ,date,to}=req.query;
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: from,
            destinationLocationCode: to,
            departureDate: date,
            adults: 1 
          });
          const flights = response.data.map(offer => {
            const flightCode = offer.itineraries[0].segments[0].carrierCode;
            const price = offer.price.total;
      
            return { flightCode, price };
          });
        res.status(200).send(flights);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}

export default getFlightController;