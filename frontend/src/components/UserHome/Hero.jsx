import { useEffect, useState } from "react";
import image from "../../assets/image6.jpg";
import ListFilterProperties from "./ListFilterProperties";
import axios from "axios";
import Nav from "./Nav";
import { propertyAPI } from "../../api/api";
const { getDetailsUserSide,getFilterProperties } = propertyAPI();


const Hero = () => {
  const [showResults, setShowResults] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [suggestedPropertyTypes, setSuggestedPropertyTypes] = useState([]);
  const [price, setPrice] = useState("");
  const [suggestedPrices, setSuggestedPrices] = useState([]);
  const [cities, setcities] = useState([]);
  const [filterProperties, setFilterProperties] = useState([]);
  const [msg, setmsg] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    async function getDetails() {
      try {
        const response =await getDetailsUserSide()
        setcities(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  
    getDetails();
  }, []);
  
 

  const handleSearch = async() => {
    if (!location || !propertyType || !price) {
      // Show an error message or perform any desired action
      console.log("Please add values");
      setmsg(true);
      return;
    } else {
      setmsg(false);

      const locationValue = location;
      const propertyTypeValue = propertyType;
      const priceValue = price;

      // axios
      //   .post("http://localhost:5000/property/getFilterProperties", {
      //     location: locationValue,
      //     propertyType: propertyTypeValue,
      //     price: priceValue,
      //   })

     await getFilterProperties(locationValue,propertyTypeValue,priceValue)

        .then((response) => {
          if (response.data.length === 0) {
            console.log("not there");
            setSearch(true);
            setShowResults(false);

          } else {
            console.log("there");
            setSearch(false);
            setShowResults(true);
            setFilterProperties(response.data);
          }
        });
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationInput = (event) => {
    const input = event.target.value;
    const suggestions = cities; // Replace with your own list of suggestions or fetch from an API

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestedLocations(filteredSuggestions);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handlePropertyTypeInput = (event) => {
    const input = event.target.value;
    const suggestions = ["4BHK", "3BHK", "2BHK"]; // Replace with your own list of suggestions or fetch from an API

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestedPropertyTypes(filteredSuggestions);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePriceInput = (event) => {
    const input = event.target.value;
    const suggestions = ["1000-3000", "3000-8000", , "8000-10000"]; // Replace with your own list of suggestions or fetch from an API

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestedPrices(filteredSuggestions);
  };

  return (
    <div className="">
      <Nav/>
      <div className="h-[500px] mt-28 relative">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-md relative"
        />

        <div className="absolute bottom-5 w-full">
          <div className="bg-white w-11/12 xl:w-4/5 m-auto grid grid-cols-2 lg:flex justify-between items-center p-5 drop-shadow-2xl md:space-x-5 md:rounded-md">
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="location">Location</label>
              <input
                required
                type="text"
                placeholder="Ernakulam"
                value={location}
                onChange={handleLocationChange}
                onInput={handleLocationInput}
                className="outline-0 text-xs"
                list="suggestedLocations"
              />
              <datalist id="suggestedLocations">
                {suggestedLocations.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="property">Property type</label>
              <input
                required
                type="text"
                placeholder="property"
                value={propertyType}
                onChange={handlePropertyTypeChange}
                onInput={handlePropertyTypeInput}
                className="outline-0 text-xs"
                list="suggestedPropertyTypes"
              />
              <datalist id="suggestedPropertyTypes">
                {suggestedPropertyTypes.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="price">Max Price</label>
              <input
                required
                type="text"
                placeholder="8000-15000"
                value={price}
                onChange={handlePriceChange}
                onInput={handlePriceInput}
                className="outline-0 text-xs"
                list="suggestedPrices"
              />
              <datalist id="suggestedPrices">
                {suggestedPrices.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>
            <div>
              <button
                onClick={handleSearch}
                className="bg-yellow-400 px-5 py-2 mt-5 md:mt-0 md:rounded-full"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {search ? (
        <h1 className="text-center font-bold text-red-700">
          there are no matched properties{" "}
        </h1>
      ) : (
        <p className="invisible">s</p>
      )}
      {msg ? (
        <h1 className="text-center font-bold text-red-700">
          Please add some values! try again
        </h1>
      ) : (
        <p className="invisible">s</p>
      )}
      {showResults && (
        <ListFilterProperties filterProperties={filterProperties} />
      )}
    </div>
  );
};

export default Hero;
