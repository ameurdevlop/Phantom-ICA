// Fichier : App.jsx

import React, { useState } from 'react'; // Importez useState
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importez useNavigate
import LoginPage from './pages/LoginPage/LoginPage'; 
import DashboardPage from './pages/DashboardPage/DashboardPage'; 

function App() {
    // 1. État d'authentification
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // 2. Fonction de connexion (sera passée à LoginPage)
    const handleLogin = (success) => {
        if (success) {
            setIsLoggedIn(true);
            // La redirection se fera dans le composant LoginPage (voir Étape 2)
        }
    };
    
    // 3. Fonction de déconnexion (sera passée à DashboardPage / Sidebar)
    const handleLogout = () => {
        setIsLoggedIn(false);
        // Après la déconnexion, l'utilisateur revient automatiquement à la racine (LoginPage)
    };
    
    // Rendu conditionnel
    if (!isLoggedIn) {
        // Si l'utilisateur n'est PAS connecté, il ne peut voir que la page de connexion
        return (
            <Routes>
                <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
                {/* Redirige toutes les autres routes vers la page de connexion */}
                <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
        );
    }

    // Si l'utilisateur est connecté, il accède au Dashboard et à ses sous-pages
    return (
        <Routes>
            {/* La route racine (/) dirige maintenant vers le Tableau de bord */}
            <Route path="/" element={<DashboardPage onLogout={handleLogout} />} />
            {/* Toutes vos pages internes sont gérées par DashboardPage */}
            
            {/* Optionnel: Si l'utilisateur tape une URL inexistante, il verra ce message. */}
            <Route path="*" element={<h1>404 - Page Non Trouvée</h1>} />
        </Routes>
    );
}

export default App;