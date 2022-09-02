import Tree from './index';
import NodeWrapper from './NodeWrapper';
import { CoaTree } from '../../types';

interface INodeProps {
  data: CoaTree[];
  current: CoaTree;
}
function Node(props: INodeProps) {
  return (
    <NodeWrapper>
      <Tree {...props} />
    </NodeWrapper>
  );
}

export default Node;
