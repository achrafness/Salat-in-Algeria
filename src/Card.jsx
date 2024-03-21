const Card = ({time,salat , image}) => {
  const removeCte = () => {
    time = time.replace(/\s*\(CET\)/, "");
  }
  removeCte();
  return (
    <div className=" bg-white text-slate-700 h-[200px] w-[200px]">
      <img src={image} alt="salat img" className="h-3/5 w-full object-cover" />
      <div className="h-2/5 flex flex-col justify-center items-center">
        <p>{salat}</p>
        <h1>{time}</h1>
      </div>
    </div>
  );
};
export default Card;
