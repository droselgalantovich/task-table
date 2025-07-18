import type {User} from '../types/user';
import type {SortOrder} from '../types/filters';

export function sortUsers(
  users: User[],
  sortKey: string | null,
  sortOrder: SortOrder,
): User[] {
  if (!sortKey || !sortOrder) return users;

  return [...users].sort((a, b) => {
    let aValue: any = a[sortKey as keyof User];
    let bValue: any = b[sortKey as keyof User];

    // Обработка вложенных свойств адреса
    if (sortKey === 'country') {
      aValue = a.address.country;
      bValue = b.address.country;
    } else if (sortKey === 'city') {
      aValue = a.address.city;
      bValue = b.address.city;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue, 'ru')
        : bValue.localeCompare(aValue, 'ru');
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
}
