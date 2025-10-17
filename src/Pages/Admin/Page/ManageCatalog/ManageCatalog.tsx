import { CategoriesTable } from "./Tables/CategoriesTable";
import { ColorsTable } from "./Tables/ColorsTable";
import { MaterialsTable } from "./Tables/MaterialsTable";
import { SizesTable } from "./Tables/SizesTable";
import { EditionsTable } from "./Tables/EditionsTable";
import { FeaturesTable } from "./Tables/FeaturesTable";
import { CollectionsTable } from "./Tables/CollectionsTable";
import { SectionsTable } from "./Tables/SectionsTable";
const ManageCatalog = () => {
  return (
    <div className="h-[calc(100vh-3.1rem)] overflow-y-auto scrollbar-thin">
      <p>Manage Catalog</p>
      <div className="mt-5 gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CategoriesTable />
        <SizesTable />
        <ColorsTable />
        <MaterialsTable />
        <EditionsTable />
        <FeaturesTable />
        <CollectionsTable />
        <SectionsTable />
      </div>
    </div>
  );
};
export default ManageCatalog;
