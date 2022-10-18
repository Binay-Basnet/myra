import { useAccordion } from './Accordion';
import LeafNode from './LeafNode';
import Node from './Node';

const TreeDetails = () => {
  const { isOpen } = useAccordion();
  if (!isOpen) return null;

  const data = [
    {
      code: '20.1',
      title: 'General Reserve',
      type: 'ACCOUNT',
      isExtensible: false,
    },
    {
      code: '20.2',
      title: 'Patronage Refund Fund',
      type: 'GROUP',
      isExtensible: false,
    },
    {
      code: '20.3',
      title: 'cooperative Promotion Fund',
      type: 'GROUP',
      isExtensible: false,
    },
    { code: '20.4', title: 'Other funds', type: 'GROUP', isExtensible: true },
  ];
  return (
    <>
      {data.map((d) => {
        if (d.type === 'GROUP')
          return <Node code={d.code} title={d.title} isExtensible={d.isExtensible} />;
        return <LeafNode code={d.code} title={d.title} />;
      })}
    </>
  );
};

export default TreeDetails;
