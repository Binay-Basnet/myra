import { Box } from '@coop/shared/ui';

import Accordion from './Accordion';
import TreeDetails from './TreeDetails';
import TreeHeader from './TreeHeader';
import type { CoaTree } from '../../types';

interface ITreeProps {
  data: CoaTree[];
  current: CoaTree;
}

function Tree(props: ITreeProps) {
  return (
    <Box>
      <Accordion>
        <Accordion.Summary>
          <TreeHeader data={props.current} />
        </Accordion.Summary>
        <Accordion.Details>
          <TreeDetails {...props} />
        </Accordion.Details>
      </Accordion>
    </Box>
  );
}

export default Tree;
