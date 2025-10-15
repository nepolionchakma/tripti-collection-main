import { CategoriesTable } from "./Update/CategoriesTable";
const ManageCatalog = () => {
  return (
    <div>
      <p>Manage Catalog</p>
      <div className="mt-5 gap-2 grid grid-cols-4">
        <CategoriesTable />
        <CategoriesTable />
        <CategoriesTable />
        <CategoriesTable />
        <CategoriesTable />
        <CategoriesTable />
      </div>
    </div>
  );
};
export default ManageCatalog;
