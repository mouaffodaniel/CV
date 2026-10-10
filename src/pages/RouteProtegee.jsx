
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// export default function RouteProtegee() {
//     const location = useLocation();

//     const token = localStorage.getItem('token');

//     if (!token) {
//         return (
//             <Navigate
//                 to="/connexion"
//                 replace
//                 state={{ from: location }}
//             />
//         );
//     }

//     return <Outlet />;
// }

import { Navigate, Outlet } from 'react-router-dom';

export default function RouteProtegee() {
    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <Navigate
                to="/connexion"
                replace
            />
        );
    }

    return <Outlet />;
}