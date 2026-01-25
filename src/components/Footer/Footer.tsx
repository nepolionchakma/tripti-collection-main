import { Link } from "react-router";
import Categories from "../../JSON/Categories.json";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const icons = [
    {
      icon: <Facebook />,
    },
    {
      icon: <Twitter />,
    },
    {
      icon: <Instagram />,
    },
  ];
  const supportLinks = [
    {
      name: "Features",
      path: "/features",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "About",
      path: "/about",
    },
  ];
  return (
    <div className="flex flex-col gap-2 py-8 border-t border-gray-200">
      <div className="mx-auto max-w-[1100px] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col justify-between h-full gap-2">
            <div className="flex items-center gap-2">
              <img src="vite.svg" alt="" />
              <h3>Tripti Collection</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel
              et voluptas blanditiis voluptatibus placeat iure error, minus,
              laudantium necessitatibus, perspiciatis alias dolor quos dicta
              nisi.
            </p>
            <div className="flex gap-2">
              {icons.map((item, index) => (
                <div
                  key={index}
                  className="hover:text-amber-500 duration-300 p-2 rounded border border-amber-500 cursor-pointer"
                >
                  {item.icon}
                </div>
              ))}
              {/* <img src={logo} alt="facebook" />
            <img src={logo} alt="twitter" />
            <img src={logo} alt="instagram" /> */}
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Category</h1>
            <div className="flex flex-col gap-1">
              {Categories.map((item) => (
                <p
                  key={item.id}
                  className="hover:text-amber-500 cursor-pointer duration-300 hover:ml-2"
                >
                  {item.category}
                </p>
              ))}
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Support</h1>
            <div className="flex flex-col gap-1">
              {supportLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-amber-500 cursor-pointer duration-300 hover:ml-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="mx-auto max-w-[1100px] px-4">
        <div className="flex items-start">
          <p className="text-center text-sm">
            &copy; 2023 Copyright by{" "}
            <a
              className="text-amber-500"
              href="https://github.com/DataFluentTeam"
            >
              DataFluent Team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
