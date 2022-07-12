import styles from './AccountingFeatureLoan.module.css';

/* eslint-disable-next-line */
export interface AccountingFeatureLoanProps {}

export function AccountingFeatureLoan(props: AccountingFeatureLoanProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AccountingFeatureLoan!</h1>
    </div>
  );
}

export default AccountingFeatureLoan;
