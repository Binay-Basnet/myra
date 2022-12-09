import { Box } from '@myra-ui';

import { useAccordion } from './Accordion';
import LeafNode from './LeafNode';
// eslint-disable-next-line import/no-cycle
import Node from './Node';
import type { CoaTree } from '../../types';

interface ICoaTreeDetailsProps {
  data: CoaTree[];
}

const TreeDetails = ({ data }: ICoaTreeDetailsProps) => {
  const { isOpen } = useAccordion();

  if (!isOpen) return null;

  return (
    <Box>
      {data?.map((d) => {
        if (d.children.length !== 0) return <Node current={d} data={d.children} />;

        return <LeafNode data={d} />;
      })}
    </Box>
  );
};

export default TreeDetails;
