const Card = ({time,salat}) => {
  return (
    <div className="p-6 container mx-auto text-white bg-orange-300 h-[200px] w-[200px] flex flex-col rounded-2xl items-center relative">
      <p className="text-lg">{salat}</p>
      <h1 className="text-5xl items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {time}
      </h1>
    </div>
  );
};
export default Card;
