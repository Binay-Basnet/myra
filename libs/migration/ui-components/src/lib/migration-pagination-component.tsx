import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, Button, Icon } from '@myra-ui';

interface PaginationComponentProps {
  totalPages?: string;
}

const MigrationPaginationComponent = (props: PaginationComponentProps) => {
  const { totalPages = 1 } = props;
  const router = useRouter();
  const pageNumbers = [];

  for (let i = 1; i <= Number(totalPages); i += 1) {
    pageNumbers.push(i);
  }

  const previousHandler = () => {
    if (Number(router?.query?.['pageNo']) !== 1) {
      router.push({
        query: {
          ...router.query,
          pageNo: Number(router?.query?.['pageNo']) - 1,
        },
      });
    }
  };

  const nextHandler = () => {
    if (Number(router?.query?.['pageNo']) !== totalPages) {
      router.push({
        query: {
          ...router.query,
          pageNo: Number(router?.query?.['pageNo']) + 1,
        },
      });
    }
  };

  return (
    <Box display="flex" gap={2} maxWidth="100vw" overflowX="scroll">
      <Icon as={AiFillCaretLeft} color="primary" cursor="pointer" onClick={previousHandler} />
      {pageNumbers.map((item) => (
        <Button
          h={5}
          minW="-webkit-fit-content"
          color="white"
          bg={String(router?.query?.['pageNo']) === String(item) ? 'primary.800' : 'primary'}
          onClick={() =>
            router.push({
              query: {
                ...router.query,
                pageNo: item,
              },
            })
          }
        >
          {item}
        </Button>
      ))}
      <Icon as={AiFillCaretRight} color="primary" cursor="pointer" onClick={nextHandler} />
    </Box>
  );
};

export default MigrationPaginationComponent;
