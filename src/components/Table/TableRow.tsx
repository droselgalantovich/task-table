import type {User} from '../../types/user';
import styles from './TableRow.module.css';

interface Props {
  user: User;
  onClick: (user: User) => void;
}

export const TableRow: React.FC<Props> = ({user, onClick}) => {
  return (
    <tr onClick={() => onClick(user)} className={styles.tableRow}>
      <td className={styles.tableCell}>{user.lastName}</td>
      <td className={styles.tableCell}>{user.firstName}</td>
      <td className={styles.tableCell}>{user.maidenName}</td>
      <td className={styles.tableCell}>{user.age}</td>
      <td className={styles.tableCell}>{user.gender === 'male' ? 'M' : 'F'}</td>
      <td className={styles.tableCell}>{user.phone}</td>
      <td className={styles.tableCell}>{user.email}</td>
      <td className={styles.tableCell}>{user.address.country}</td>
      <td className={styles.tableCell}>{user.address.city}</td>
    </tr>
  );
};
