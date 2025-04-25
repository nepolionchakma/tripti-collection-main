import { Link } from "react-router";
import Categories from "../../JSON/Categories.json";
const logo = "vite.svg";
const Footer = () => {
  return (
    <div className="flex flex-col gap-2 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2">
            <img src="vite.svg" alt="" />
            <h3>Tripti Collection</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel et
            voluptas blanditiis voluptatibus placeat iure error, minus,
            laudantium necessitatibus, perspiciatis alias dolor quos dicta nisi.
          </p>
          <div className="flex gap-2">
            <img src={logo} alt="facebook" />
            <img src={logo} alt="twitter" />
            <img src={logo} alt="instagram" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Category</h1>
          <div className="flex flex-col gap-1">
            {Categories.map((item) => (
              <p key={item.id}>{item.category}</p>
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Support</h1>
          <div className="flex flex-col gap-1">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/features">Features</Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex items-start">
        <p className="text-center text-sm">
          &copy; 2023 Copyright by{" "}
          <a
            className="text-amber-500"
            href="https://github.com/abdullahalibrahim"
          >
            DataFluent Team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
