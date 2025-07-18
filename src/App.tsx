import {UserTable} from './components/Table/UserTable';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Users Table</h1>
      <UserTable />
    </div>
  );
}

export default App;
