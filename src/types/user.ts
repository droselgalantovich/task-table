export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  phone: number;
  email: string;
  address: {
    city: string;
    country: string;
  };
  height: number;
  weight: number;
  image: string;
}
