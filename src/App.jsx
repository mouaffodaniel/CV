// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Navigate
// } from 'react-router-dom';

// import { CvProvider } from './context/CvContext';

// import Inscription from './pages/Inscription';
// import Connexion from './pages/Connexion';
// import MotDePasseOublie from './pages/MotDePasseOublie';
// import ReinitialiserMotDePasse from './pages/ReinitialiserMotDePasse';

// import CreerCv from './pages/CreerCv';
// import MesCvs from './pages/MesCvs';
// import ModifierCv from './pages/ModifierCv';

// import RouteProtegee from './pages/RouteProtegee';

// export default function App() {
//     return (
//         <BrowserRouter>
//             <CvProvider>
//                 <Routes>
//                     {/* Redirection de la page d'accueil */}
//                     <Route
//                         path="/"
//                         element={
//                             <Navigate
//                                 to="/inscription"
//                                 replace
//                             />
//                         }
//                     />

//                     {/* Routes publiques */}
//                     <Route
//                         path="/inscription"
//                         element={<Inscription />}
//                     />

//                     <Route
//                         path="/connexion"
//                         element={<Connexion />}
//                     />

//                     <Route
//                         path="/mot-de-passe-oublie"
//                         element={<MotDePasseOublie />}
//                     />

//                     <Route
//                         path="/reinitialiser-mot-de-passe"
//                         element={<ReinitialiserMotDePasse />}
//                     />

//                     {/* Routes protégées */}
//                     <Route element={<RouteProtegee />}>
//                         <Route
//                             path="/creer-cv"
//                             element={<CreerCv />}
//                         />

//                         <Route
//                             path="/mes-cvs"
//                             element={<MesCvs />}
//                         />
//                         <Route
//     path="/modifier-cv/:id"
//     element={<ModifierCv />}
// />
//                     </Route>

//                     {/* Route inconnue */}
//                     <Route
//                         path="*"
//                         element={
//                             <Navigate
//                                 to="/inscription"
//                                 replace
//                             />
//                         }
//                     />
//                 </Routes>
//             </CvProvider>
//         </BrowserRouter>
//     );
// }










import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import { CvProvider } from './context/CvContext';

import LandingPage from './pages/LandingPage';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import MotDePasseOublie from './pages/MotDePasseOublie';
import ReinitialiserMotDePasse from './pages/ReinitialiserMotDePasse';

import CreerCv from './pages/CreerCv';
import MesCvs from './pages/MesCvs';
import ModifierCv from './pages/ModifierCv';

import RouteProtegee from './pages/RouteProtegee';

export default function App() {
    return (
        <BrowserRouter>
            <CvProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route
                        path="/inscription"
                        element={<Inscription />}
                    />

                    <Route
                        path="/connexion"
                        element={<Connexion />}
                    />

                    <Route
                        path="/mot-de-passe-oublie"
                        element={<MotDePasseOublie />}
                    />

                    <Route
                        path="/reinitialiser-mot-de-passe"
                        element={<ReinitialiserMotDePasse />}
                    />

                    <Route element={<RouteProtegee />}>
                        <Route
                            path="/creer-cv"
                            element={<CreerCv />}
                        />

                        <Route
                            path="/mes-cvs"
                            element={<MesCvs />}
                        />

                        <Route
                            path="/modifier-cv/:id"
                            element={<ModifierCv />}
                        />
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </CvProvider>
        </BrowserRouter>
    );
}