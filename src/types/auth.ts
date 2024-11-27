export type Role = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
}