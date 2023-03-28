import { AdditionalInformationInventoryItems } from './AdditionalInformation';
import { BasicDetailsInventory } from './InventoryBasicDetails';
import { InventoryItemsLedger } from './InventoryLedgerDetails';

export const InventorySimpleForm = () => (
  <>
    <BasicDetailsInventory />
    <InventoryItemsLedger />
    <AdditionalInformationInventoryItems />
  </>
);
