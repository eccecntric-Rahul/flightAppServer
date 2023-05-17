import amadeus from "../index"

const getCityController = async (req, res) => {
    try {
        const {searchStr}=req.query;
        const response = await await amadeus.referenceData.locations.get({
            keyword:searchStr,
            subType: 'CITY'
          });
        res.status(200).send(response.data);
    } catch (err) {
        console.log(err)
        res.status(400).send("Error occured");
    }
}

export default getCityController;