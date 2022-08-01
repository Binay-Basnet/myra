import {
  List,
  ListIcon,
  ListItem,
  ListItemProps,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraListProps extends ListItemProps {
  children: React.ReactNode;
}

export function ChakraList(props: ChakraListProps) {
  return (
    <UnorderedList>
      <ListItem>Lorem ipsum dolor sit amet</ListItem>
      <ListItem>Consectetur adipiscing elit</ListItem>
      <ListItem>Integer molestie lorem at massa</ListItem>
      <ListItem>Facilisis in pretium nisl aliquet</ListItem>
    </UnorderedList>
  );
}

export { List, ListIcon, ListItem, OrderedList, UnorderedList };

export default ChakraList;
