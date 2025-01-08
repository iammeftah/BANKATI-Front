import axios from 'axios';

const AUTH_URL = 'https://bankati-auth.onrender.com';
const WALLET_URL = 'https://bankat1-wallet.onrender.com/api';

const getAuthToken = () => localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';

export const api = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const walletApi = axios.create({
    baseURL: WALLET_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

[api, walletApi].forEach(instance => {
    instance.interceptors.request.use(
        (config) => {
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        response => response,
        error => Promise.reject(error)
    );
});