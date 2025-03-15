import FeatureItem from "../../JSON/Features.json";

const Features = () => {
  return (
    <div className="flex gap-9 py-4 justify-center bg-amber-200">
      {FeatureItem.map((item) => (
        <div key={item.id} className="flex gap-2">
          <div>
            <img src={item.img} alt="" />
          </div>
          <div className="flex flex-col">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
