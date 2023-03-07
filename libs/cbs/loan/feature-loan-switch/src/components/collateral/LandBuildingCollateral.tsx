import { FormSection, GridItem } from '@myra-ui';

import { BuildingType, ConstructionType } from '@coop/cbs/data-access';
import { ValuationDocuments } from '@coop/cbs/loan';
import { FormInput, FormSelect } from '@coop/shared/form';

import { LandDetails } from './LandDetails';
import { ValuationInputs } from './ValuationInputs';
import { ValuatorSelect } from './ValuatorSelect';

export const LandBuildingCollateral = () => (
  <FormSection>
    <LandDetails />

    <GridItem colSpan={2}>
      <FormSelect
        name="buildingType"
        label="Building Type"
        options={[
          { label: 'Industrial', value: BuildingType.Industrial },
          { label: 'Institutional', value: BuildingType.Institutional },
          { label: 'Commercial', value: BuildingType.Commercial },
          { label: 'Residential', value: BuildingType.Residential },
        ]}
      />
    </GridItem>

    <GridItem colSpan={2}>
      <FormSelect
        name="constructionType"
        label="Construction Type"
        options={[
          { label: 'Wood Frame', value: ConstructionType.WoodFrame },
          { label: 'Light Gauge Steel Frame', value: ConstructionType.LightGaugeSteelFrame },
          {
            label: 'Joisted or Load Bearing Masonry',
            value: ConstructionType.JoistedOrLoadBearingMasonry,
          },
          { label: 'Steel Frame', value: ConstructionType.SteelFrame },
          { label: 'Concrete Frame', value: ConstructionType.SteelFrame },
          { label: 'Pre Enginnered', value: ConstructionType.PreEngineered },
        ]}
      />
    </GridItem>

    <GridItem colSpan={2}>
      <FormInput name="noOfStorey" label="No. of Storey" />
    </GridItem>

    <ValuatorSelect />
    <ValuationInputs />
    <ValuationDocuments />
  </FormSection>
);
