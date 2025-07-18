import type {User} from '../../types/user';
import styles from './UserModal.module.css';

interface Props {
  user: User;
  onClose: () => void;
}

export const UserModal: React.FC<Props> = ({user, onClose}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>User Details</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className={styles.avatar}
          />

          <div className={styles.userInfo}>
            <h3 className={styles.userName}>
              {user.lastName} {user.firstName} {user.maidenName}
            </h3>

            <div className={styles.infoGrid}>
              <div>
                <strong>Age:</strong> {user.age} years
              </div>
              <div>
                <strong>Gender:</strong>{' '}
                {user.gender === 'male' ? 'Male' : 'Female'}
              </div>
              <div>
                <strong>Height:</strong> {user.height} cm
              </div>
              <div>
                <strong>Weight:</strong> {user.weight} kg
              </div>
              <div>
                <strong>Phone:</strong> {user.phone}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>

              <div className={styles.addressSection}>
                <strong>Address:</strong>
                <div className={styles.addressContent}>
                  <div>Country: {user.address.country}</div>
                  <div>City: {user.address.city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
