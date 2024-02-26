import { useState, useEffect } from "react";
import axios from "axios";
import Card from  "./Card"
const App = () => {
  const [city, setCity] = useState("adrar");
  const [timeOfSalat, setTimeOfSalat] = useState("");

  const wilayaNames = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Bejaia",
    "Biskra",
    "Bechar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tebessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Setif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbes",
    "Annaba",
    "Guelma",
    "Constantine",
    "Medea",
    "Mostaganem",
    "Msila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdes",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naama",
    "Aïn Temouchent",
    "Ghardaia",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El MGhaier",
    "El Meniaa",
  ];

  const fetchData = async (parmCity) => {
    const result = await axios.get(
      `http://api.aladhan.com/v1/calendarByCity?country=dz&city=${parmCity}`
    );
    return result.data.data[0].timings;
  };
  useEffect(() => {
    fetchData(city)
      .then((d) => {
        setTimeOfSalat(d);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const removeCte = (originalString) => {
    return originalString.replace(/\s*\(CET\)/, "");
  };
  return (
    <div className="md:h-screen h-auto bg-blue-950 flex  flex-col justify-center relative ">
      <div className="text-white">
        <label
          htmlFor="selectCity"
          className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          اختر المدينة المناسبة لك :{" "}
        </label>
        <select
          id="selectCity"
          name="city"
          onChange={handleCityChange}
          className="px-3 mx-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {wilayaNames.map((wilaya, index) => (
            <option key={index} value={wilaya.toLowerCase().replace(/ /g, "-")}>
              {wilaya}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-4 ">
        <Card
          salat="العشاء"
          time={timeOfSalat.Isha ? removeCte(timeOfSalat.Isha) : ""}
        />
        <Card
          salat="المغرب"
          time={timeOfSalat.Maghrib ? removeCte(timeOfSalat.Maghrib) : ""}
        />
        <Card
          salat="العصر"
          time={timeOfSalat.Fajr ? removeCte(timeOfSalat.Asr) : ""}
        />
        <Card
          salat="الظهر"
          time={timeOfSalat.Fajr ? removeCte(timeOfSalat.Dhuhr) : ""}
        />
        <Card
          salat="الفجر"
          time={timeOfSalat.Fajr ? removeCte(timeOfSalat.Fajr) : ""}
        />{" "}
      </div>
    </div>
  );
};
export default App;