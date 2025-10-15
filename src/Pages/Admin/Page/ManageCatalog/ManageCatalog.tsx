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
    <div>
      <p>Manage Catalog</p>
      <div className="mt-5 gap-2 grid grid-cols-4">
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
