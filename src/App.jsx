import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card"
import './app.css'
const App = () => {
  const [city, setCity] = useState({
    english: "adrar",
    arabic: "أدرار",
  });
  const [data, setDate] = useState([])
  const [timeOfSalat, setTimeOfSalat] = useState("");
  const removeCte = (time) => {
    return time ? time.replace(/\s*\(CET\)/, "") : ""
  }
  const wilayaNames = [
    { english: "adrar", arabic: "أدرار" },
    { english: "chlef", arabic: "الشلف" },
    { english: "laghouat", arabic: "الأغواط" },
    { english: "oum-el-bouaghi", arabic: "أم البواقي" },
    { english: "batna", arabic: "باتنة" },
    { english: "bejaia", arabic: "بجاية" },
    { english: "biskra", arabic: "بسكرة" },
    { english: "bechar", arabic: "بشار" },
    { english: "blida", arabic: "البليدة" },
    { english: "bouira", arabic: "البويرة" },
    { english: "tamanrasset", arabic: "تمنراست" },
    { english: "tebessa", arabic: "تبسة" },
    { english: "tlemcen", arabic: "تلمسان" },
    { english: "tiaret", arabic: "تيارت" },
    { english: "tizi-ouzou", arabic: "تيزي وزو" },
    { english: "algiers", arabic: "الجزائر" },
    { english: "djelfa", arabic: "الجلفة" },
    { english: "jijel", arabic: "جيجل" },
    { english: "setif", arabic: "سطيف" },
    { english: "saïda", arabic: "سعيدة" },
    { english: "skikda", arabic: "سكيكدة" },
    { english: "sidi-bel-abbes", arabic: "سيدي بلعباس" },
    { english: "annaba", arabic: "عنابة" },
    { english: "guelma", arabic: "قالمة" },
    { english: "constantine", arabic: "قسنطينة" },
    { english: "medea", arabic: "المدية" },
    { english: "mostaganem", arabic: "مستغانم" },
    { english: "msila", arabic: "المسيلة" },
    { english: "mascara", arabic: "معسكر" },
    { english: "ouargla", arabic: "ورقلة" },
    { english: "oran", arabic: "وهران" },
    { english: "el-bayadh", arabic: "البيض" },
    { english: "illizi", arabic: "اليزي" },
    { english: "bordj-bou-arreridj", arabic: "برج بوعريريج" },
    { english: "boumerdes", arabic: "بومرداس" },
    { english: "el-tarf", arabic: "الطارف" },
    { english: "tindouf", arabic: "تندوف" },
    { english: "tissemsilt", arabic: "تيسمسيلت" },
    { english: "el-oued", arabic: "الوادي" },
    { english: "khenchela", arabic: "خنشلة" },
    { english: "souk-ahras", arabic: "سوق أهراس" },
    { english: "tipaza", arabic: "تيبازة" },
    { english: "mila", arabic: "ميلة" },
    { english: "aïn-defla", arabic: "عين الدفلى" },
    { english: "naama", arabic: "النعامة" },
    { english: "aïn-temouchent", arabic: "عين تموشنت" },
    { english: "ghardaia", arabic: "غرداية" },
    { english: "relizane", arabic: "غليزان" },
    { english: "timimoun", arabic: "تميمون" },
    { english: "bordj-badji-mokhtar", arabic: "برج بادجي مختار" },
    { english: "ouled-djellal", arabic: "أولاد جلال" },
    { english: "béni-abbès", arabic: "بني عباس" },
    { english: "in-salah", arabic: "إن صالح" },
    { english: "in-guezzam", arabic: "إن قزام" },
    { english: "touggourt", arabic: "تقرت" },
    { english: "djanet", arabic: "جانت" },
    { english: "el-mghaier", arabic: "المغير" },
    { english: "el-meniaa", arabic: "المنيعة" },
  ];
  const fetchData = async (parmCity) => {
    const result = await axios.get(
      `https://api.aladhan.com/v1/calendarByCity?country=dz&city=${parmCity}`
    );
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    return result.data.data[dayOfMonth - 1];
  };
  useEffect(() => {
    fetchData(city.english)
      .then((d) => {
        setTimeOfSalat(d.timings);
        setDate(d.date.hijri.weekday.ar);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);
  const handleCityChange = (event) => {
    //remove number- from the string
    setCity({
      english: event.target.value,
      arabic: event.target.selectedOptions[0].text.replace(/^\d+-/, ""),
    });
  };


  return (
    <div className="home  md:h-screen h-auto  flex  flex-col justify-center relative ">
      <div className="z-10">
        <p className="text-white m-6 font-semibold text-5xl">{city.arabic}</p>
        <p className="text-slate-400 m-2 mr-6 font-normal text-xl">{data}</p>
      </div>
      <div className="z-10 m-6 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-4 " dir="ltr">
        <Card
          salat="العشاء"
          time={timeOfSalat.Isha ? timeOfSalat.Isha : ""}
          image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
        />
        <Card
          salat="المغرب"
          time={timeOfSalat.Maghrib ? timeOfSalat.Maghrib : ""}
          image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
        />
        <Card
          salat="العصر"
          time={timeOfSalat.Fajr ? timeOfSalat.Asr : ""}
          image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
        />
        <Card
          salat="الظهر"
          time={timeOfSalat.Fajr ? timeOfSalat.Dhuhr : ""}
          image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
        />
        <Card
          salat="الفجر"
          time={timeOfSalat.Fajr ? timeOfSalat.Fajr : ""}
          image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
        />{" "}
      </div>
      <div className="text-white p-6 z-10">
        <label
          htmlFor="selectCity"
          className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          اختر المدينة المناسبة لك :{" "}
        </label>
        <select
          id="selectCity"
          name="city"
          style={{ direction: "rtl" }}
          onChange={handleCityChange}
          className="px-3 mx-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {wilayaNames.map((wilaya, index) => (
            <option key={index} value={wilaya.english}>
              {`${index + 1}-${wilaya.arabic}`}
            </option>
          ))}
        </select>
      </div>
      <div className="night w-full flex gap-4 px-12 z-10 justify-center text-white text-center">
        <div>{removeCte(timeOfSalat.Firstthird)}</div>
        <div>النصف الاول من اليل</div>
        <div>{removeCte(timeOfSalat.Midnight)}</div>
        <div>النصف الثاني من اليل</div>
        <div>{removeCte(timeOfSalat.Lastthird)}</div>
        <div>النصف الثالث من اليل</div>
        <div>{removeCte(timeOfSalat.Fajr)}</div>
      </div>
    </div>
  );
};
export default App;