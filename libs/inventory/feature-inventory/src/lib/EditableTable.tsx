import { FaAngleRight } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const headers = [
  { accessor: 'name', label: 'Name', isEditable: false },
  { accessor: 'quantity', label: 'Quantity', isEditable: true },
  { accessor: 'rate', label: 'Rate', isEditable: true },
  { accessor: 'tax', label: 'Tax', isEditable: true },
  { accessor: 'totalAmount', label: 'Total Amount', isEditable: true },
];

const products = [
  { name: 'M003 - Mi TV', quantity: 45, rate: 45, tax: 45, totalAmount: 23 },
  {
    name: "M004 - Dell Monitor 24'' S2421HN Full HD IPS",
    quantity: 2,
    rate: 4,
    tax: 4,
    totalAmount: 34212,
  },
];

export const EditableTable = () => {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Th
            bg="neutralColorLight.Gray-70"
            color="neutralColorLight.Gray-0"
          ></Th>
          {headers.map((header) => (
            <Th
              key={header.accessor}
              bg="neutralColorLight.Gray-70"
              color="neutralColorLight.Gray-0"
            >
              {header.label}
            </Th>
          ))}
          <Th
            bg="neutralColorLight.Gray-70"
            color="neutralColorLight.Gray-0"
          ></Th>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr>
              <Td>
                {/* <Icon width="20px" height="20px" as={FaAngleRight} /> */}
                <IconButton
                  icon={<FaAngleRight width="36px" height="36px" />}
                  aria-label="extend row"
                  variant="ghost"
                />
              </Td>
              {headers.map((head) =>
                head.isEditable ? (
                  <Td>
                    <Input
                      border={'none'}
                      type="text"
                      defaultValue={product[head.accessor]}
                      //   _focus={{ border: 'none' }}
                      //   _focusVisible={{ border: 'none' }}
                    />

                    {/* <input type="text" defaultValue={product[head.accessor]} /> */}
                  </Td>
                ) : (
                  <Td>{product[head.accessor]}</Td>
                )
              )}
              <Td>
                {/* <Icon
                  color="danger"
                  width="36px"
                  height="36px"
                  as={TiDeleteOutline}
                /> */}

                <IconButton
                  icon={<TiDeleteOutline />}
                  aria-label="extend row"
                  variant="ghost"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
