import FeatureItem from "../../JSON/Features.json";

const Features = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 justify-center bg-amber-200">
      {FeatureItem.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-4 w-full border border-amber-500 p-4 rounded-md hover:shadow-2xl hover:scale-105 duration-300 shadow-md"
        >
          <div>
            <img src={item.img} alt="" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold">{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
