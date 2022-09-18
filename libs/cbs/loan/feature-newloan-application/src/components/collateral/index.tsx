import { DocumentCollateral } from './DocumentCollateral';
import { LandBuildingCollateral } from './LandBuildingCollateral';
import { LandCollateral } from './LandCollateral';
import { OtherCollateral } from './OtherCollateral';
import { VehicleCollateral } from './VehicleCollateral';

export const COLLATERAL_COMPS = {
  Land: <LandCollateral />,
  'Land and Building': <LandBuildingCollateral />,
  Vehicle: <VehicleCollateral />,
  Documents: <DocumentCollateral />,
  Others: <OtherCollateral />,
  '': null,
};
