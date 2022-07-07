import Tree from './index';
import NodeWrapper from './NodeWrapper';

interface INodeProps {
  code: string;
  title: string;
  isExtensible: boolean;
}
function Node(props: INodeProps) {
  const { code, title, isExtensible } = props;
  return (
    <NodeWrapper>
      <Tree code={code} title={title} isExtensible={isExtensible} />
    </NodeWrapper>
  );
}

export default Node;
