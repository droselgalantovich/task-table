import {useEffect, useState} from 'react';
import {fetchUsers} from '../utils/fetchUtils';
import type {User} from '../types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        setLoading(true);
        setError(null);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : 'Error loading users';
        setError(errorMessage);
        console.error('Error loading users:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {users, loading, error};
}
