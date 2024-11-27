import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Simulated user data
const INITIAL_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user'
  },
  {
    id: '3',
    email: 'user2@example.com',
    password: 'user123',
    name: 'Second User',
    role: 'user'
  }
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  users: INITIAL_USERS,

  login: async (email: string, password: string) => {
    const { users } = get();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = btoa(JSON.stringify({ ...user, password: undefined }));
    localStorage.setItem('token', token);
    
    set({
      user: { ...user, password: undefined } as User,
      token,
      isAuthenticated: true
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = JSON.parse(atob(token));
        set({
          user,
          token,
          isAuthenticated: true
        });
      } catch {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      }
    }
  },

  deleteUser: (id: string) => {
    const { users, user } = get();
    if (id === user?.id) {
      throw new Error('Cannot delete your own account');
    }
    set({ users: users.filter(u => u.id !== id) });
  },

  updateUser: (id: string, userData: Partial<User>) => {
    const { users } = get();
    set({
      users: users.map(u => 
        u.id === id 
          ? { ...u, ...userData }
          : u
      )
    });
  }
}));