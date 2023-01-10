import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';

import { ROUTES } from '../constants/ROUTES';

interface IProps {
  label?: string;
  id: string;
  type: 'member' | 'loan' | 'savings' | 'transactions' | 'account-close';
}

export const RouteToDetailsPage = ({ label, type, id }: IProps) => {
  const router = useRouter();
  switch (type) {
    case 'member':
      return (
        <Button variant="link" onClick={() => router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`)}>
          {label}
        </Button>
      );
    case 'loan':
      return (
        <Button
          variant="link"
          onClick={() => router.push(`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${id}`)}
        >
          {label}
        </Button>
      );
    case 'savings':
      return (
        <Button
          variant="link"
          onClick={() => router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`)}
        >
          {label}
        </Button>
      );
    case 'transactions':
      return (
        <Button
          variant="link"
          onClick={() => router.push(`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${id}`)}
        >
          {label}
        </Button>
      );
    case 'account-close':
      return (
        <Button
          variant="link"
          onClick={() => router.push(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${id}`)}
        >
          {label}
        </Button>
      );

    default:
      return (
        <Button
          variant="link"
          onClick={() => router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${id}`)}
        >
          {label}
        </Button>
      );
  }
};
