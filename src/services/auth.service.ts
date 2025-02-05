import {AuthResponse, LoginCredentials } from '../types/auth.type';
import { api } from './api';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {

            const response = await api.post<AuthResponse>('auth/authenticate', credentials);

            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('userId', response.data.user.id.toString());
                return response.data;
            }
            throw new Error('Invalid response format');
        } catch (error: any) {
            this.logout();
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        localStorage.removeItem('userId');

    },

    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            this.logout();
            return null;
        }
    },

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = this.getCurrentUser();
        return !!(token && user);
    },
};