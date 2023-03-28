import { AdditionalInformationInventoryItems } from './AdditionalInformation';
import { BasicDetailsInventory } from './InventoryBasicDetails';
import { InventoryItemGenerateVariantsForm } from './InventoryItemGenerateVariantsForm';
import { InventoryItemsLedger } from './InventoryLedgerDetails';

export const InventoryItemVariantForm = () => (
  <>
    <BasicDetailsInventory />
    <InventoryItemGenerateVariantsForm />
    <InventoryItemsLedger />
    <AdditionalInformationInventoryItems />
  </>
);
