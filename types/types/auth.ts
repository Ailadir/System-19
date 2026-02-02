import { User } from '../api';

export interface AuthState {
  isAuthenticated: boolean;
  role: 'parent' | 'specialist' | null;
  user?: User | null;
}
