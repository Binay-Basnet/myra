import { Button } from '@myra-ui';

import { ROUTES } from '../constants/ROUTES';

interface IProps {
  label?: string;
  id: string;
  type:
    | 'member'
    | 'loan'
    | 'savings'
    | 'transactions'
    | 'account-close'
    | 'saving-product'
    | 'loan-product';
}

export const RouteToDetailsPage = ({ label, type, id }: IProps) => {
  switch (type) {
    case 'loan-product':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_LOAN_PRODUCTS_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_LOAN_PRODUCTS_DETAILS}?id=${id}`, '_blank')}
        >
          {label}{' '}
        </Button>
        // </Link>
      );
    case 'saving-product':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_SAVING_PRODUCT_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() =>
            window.open(`${ROUTES.CBS_ACCOUNT_SAVING_PRODUCT_DETAILS}?id=${id}`, '_blank')
          }
        >
          {label}{' '}
        </Button>
        // </Link>
      );
    case 'member':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`, '_blank')}
        >
          {label}
        </Button>
        // </Link>
      );
    case 'loan':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${id}`, '_blank')}
        >
          {label}{' '}
        </Button>
        // </Link>
      );
    case 'savings':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`, '_blank')}
        >
          {label}{' '}
        </Button>
        // </Link>
      );
    case 'transactions':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() =>
            window.open(`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${id}`, '_blank')
          }
        >
          {label}{' '}
        </Button>
        // </Link>
      );
    case 'account-close':
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          minW="auto"
          px={0}
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`, '_blank')}
        >
          {label}{' '}
        </Button>
        // </Link>
      );

    default:
      return (
        // <Link target="_blank" href={`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`}>
        <Button
          variant="link"
          color="primary.500"
          fontSize="s3"
          onClick={() => window.open(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`, '_blank')}
        >
          {label}{' '}
        </Button>
        // </Link>
      );
  }
};

// export const RouteToDetailsPage = ({ label, type, id }: IProps) => (
//   <Box
//     sx={{
//       '@media print': {
//         'a[href]:after': `content: '"none !important"'`,
//       },
//     }}
//   >
//     {getLink({ label, type, id })}
//   </Box>
// );
