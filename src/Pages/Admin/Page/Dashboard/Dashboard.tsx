import { CarTaxiFront, ChartBar, Clipboard, UserCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="bg-amber-100 p-4 border border-amber-400 rounded-md hover:bg-amber-200 cursor-pointer duration-300">
        <h4>Total Sales</h4>
        <div className="flex justify-between items-center">
          <h1>$500K</h1>
          <ChartBar />
        </div>
      </div>
      <div className="bg-green-100 p-4 border border-green-400 rounded-md hover:bg-green-200 cursor-pointer duration-300">
        <h4>Total Customers</h4>
        <div className="flex justify-between items-center">
          <h1>$500K</h1>
          <UserCheck />
        </div>
      </div>
      <div className="bg-blue-100 p-4 border border-blue-400 rounded-md hover:bg-blue-200 cursor-pointer duration-300">
        <h4>Total Products</h4>
        <div className="flex justify-between items-center">
          <h1>$500K</h1>
          <Clipboard />
        </div>
      </div>
      <div className="bg-red-100 p-4 border border-red-400 rounded-md hover:bg-red-200 cursor-pointer duration-300">
        <h4>Total Orders</h4>
        <div className="flex justify-between items-center">
          <h1>$500K</h1>
          <CarTaxiFront />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
