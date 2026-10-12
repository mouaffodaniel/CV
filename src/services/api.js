// import axios from 'axios';

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
//     headers: {
//         Accept: 'application/json',
//     },
// });

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;


import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// En développement, on garde l'API locale comme secours.
// En production, on refuse de démarrer sans la vraie adresse.
const baseURL =
    API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : undefined);

if (!baseURL) {
    console.error(
        "VITE_API_URL est manquante : définissez-la dans les variables d'environnement de Vercel, puis redéployez."
    );
}

const api = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

        return Promise.reject(error);
    }
);

export default api;