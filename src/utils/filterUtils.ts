import type {User} from '../types/user';
import type {FilterValues} from '../types/filters';

export function filterUsers(users: User[], filters: FilterValues): User[] {
  return users.filter((user) => {
    if (
      filters.firstName &&
      !user.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.lastName &&
      !user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
    ) {
      return false;
    }

    if (filters.age && user.age.toString() !== filters.age) {
      return false;
    }

    if (filters.gender && user.gender !== filters.gender) {
      return false;
    }

    if (filters.phone && !user.phone.toString().includes(filters.phone)) {
      return false;
    }

    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.country &&
      !user.address.country
        .toLowerCase()
        .includes(filters.country.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.city &&
      !user.address.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}
