import { Box } from '@saccos/myra/ui';

import Tree from './Tree';
import { AccordionComponent } from '../accordion/AccordionComponent';

export const FullView = () => {
  return (
    <Box
      p="10px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="35vh"
    >
      <AccordionComponent id="Equity" title="Equity and Liaibilities">
        <Tree code="10" title="Share Capital" isExtensible={false} />
      </AccordionComponent>

      <AccordionComponent id="Assets" title="Assets">
        <Tree code="10" title="Share Capital" isExtensible={false} />
      </AccordionComponent>

      <AccordionComponent id="Expenditure" title="Expenditure">
        <Tree code="10" title="Share Capital" isExtensible={false} />
      </AccordionComponent>

      <AccordionComponent id="Income" title="Income ">
        <Tree code="10" title="Share Capital" isExtensible={false} />
      </AccordionComponent>
    </Box>
  );
};
