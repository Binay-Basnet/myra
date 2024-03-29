import Accordion from './Accordion';
import TreeDetails from './TreeDetails';
import TreeHeader from './TreeHeader';

interface ITreeProps {
  code: string;
  title: string;
  isExtensible?: boolean;
}

const Tree = (props: ITreeProps) => (
  <Accordion>
    <Accordion.Summary>
      <TreeHeader {...props} />
    </Accordion.Summary>
    <Accordion.Details>
      <TreeDetails />
    </Accordion.Details>
  </Accordion>
);

export default Tree;
