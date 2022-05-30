import { AccordionComponent } from '@saccos/myra/components';
import { Box } from '@saccos/myra/ui';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';

const ChartsOfAccounts = () => {
  return (
    <Box>
      <AccordionComponent id="Equity" title="Equity and Liaibilities">
        Equity and Liaibilities
      </AccordionComponent>

      <AccordionComponent id="Assets" title="Assets">
        Assets
      </AccordionComponent>

      <AccordionComponent id="Expenditure" title="Expenditure">
        Expenditure
      </AccordionComponent>

      <AccordionComponent id="Income" title="Income ">
        Income
      </AccordionComponent>
    </Box>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
