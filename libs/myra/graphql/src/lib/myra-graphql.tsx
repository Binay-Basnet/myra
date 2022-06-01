import styles from './myra-graphql.module.scss';

/* eslint-disable-next-line */
export interface MyraGraphqlProps {}

export function MyraGraphql(props: MyraGraphqlProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MyraGraphql!</h1>
    </div>
  );
}

export default MyraGraphql;
