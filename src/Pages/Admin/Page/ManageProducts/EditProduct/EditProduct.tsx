import { Product } from "@/types/Types";
import { Dispatch, SetStateAction } from "react";

interface IEditProductProps {
  selectedData: Product[];
  setActionName: Dispatch<SetStateAction<string>>;
}
const EditProduct = ({ selectedData, setActionName }: IEditProductProps) => {
  console.log(selectedData, "selectedData", setActionName);
  return <div>EditProduct</div>;
};

export default EditProduct;
