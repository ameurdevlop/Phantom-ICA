// Fichier : LoginPage/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importez useNavigate
import GlassCard from '../../components/GlassCard/GlassCard'; 
import styles from './LoginPage.module.css'; 

// SVG de l'icône (Inchangé)
const PhantomLogo = () => (
    // ... code du SVG ...
    <svg
      className={styles.logoSvg} 
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="17" x2="12" y2="17.01"></line>
      <path d="M12 10L12 14"></path>
      <path d="M10 8L14 8"></path>
      <path d="M10 16L14 16"></path>
    </svg>
);

// Composant principal LoginPage reçoit onLogin en prop
const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate(); // 2. Initialisez la fonction de navigation
    
    const [showPassword, setShowPassword] = useState(false);
    const [agentId, setAgentId] = useState('');
    const [passphrase, setPassphrase] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        // --- LOGIQUE DE VÉRIFICATION SIMULÉE ---
        // Vous pouvez laisser les valeurs 'agent' et '47' pour le test
        if (agentId === 'agent' && passphrase === '47') { 
            
            // 3. Déclenche la connexion dans App.jsx
            // Cela met à jour l'état d'authentification
            onLogin(true); 
            
            // 4. Redirection immédiate vers le Dashboard
            // Dans App.jsx, la route "/" est maintenant le Dashboard si l'utilisateur est connecté
            navigate('/'); 

        } else {
            // Afficher une erreur si les identifiants sont incorrects
            alert('Authentification échouée. Veuillez utiliser Agent ID: "agent" et Passphrase: "47".'); 
        }
    };

    return (
        // Conteneur principal (Inchangé)
        <div className={styles.container}>
            
            {/* ... Background et Left Panel (Inchangés) ... */}
            
            <div className={styles.backgroundGradient} style={{
                background: 'radial-gradient(circle at 70% 30%, rgba(255, 0, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(0, 0, 255, 0.1) 0%, transparent 50%)'
            }}></div>

            {/* Colonne Gauche - Marque et Notice Système (Inchangée) */}
            <div className={styles.leftPanel}>
                <div className={styles.headerBlock}>
                    <PhantomLogo />
                    <h1 className={styles.mainTitle}>PHANTOM</h1>
                    <p className={styles.subTitle}>International Contract Agency</p>
                </div>
                <GlassCard externalClasses={styles.noticeCard}> 
                    <h2 className={styles.noticeTitle}>System Notice</h2>
                    <p className={styles.noticeText}>
                        All operations are classified. Unauthorized access
                        is strictly prohibited and will be
                        prosecuted to
                        the full extent of the law.
                        This system employs advanced tracking
                        mechanisms. Any breach attempt will be traced
                        and appropriate measures will be
                        taken.
                    </p>
                </GlassCard>
                <p className={styles.copyrightText}>&copy; 2023 ICA - Secure Connection Established</p>
            </div>

            {/* Colonne Droite - Formulaire d'Authentification (Inchangée) */}
            <div className={styles.rightPanel}>
                <h2 className={styles.formTitle}>Agent Authentication</h2>
                <p className={styles.formSubTitle}>Enter your credentials to access the system</p>

                {/* La soumission du formulaire appelle handleLogin */}
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {/* ... Champs Agent ID et Passphrase (Inchangés) ... */}
                    
                    {/* Champ Agent ID */}
                    <div className={styles.formGroup}>
                        <label htmlFor="agentId" className={styles.formLabel}>Agent ID</label>
                        <input
                            type="text"
                            id="agentId"
                            className={styles.formInput} 
                            placeholder="Enter your agent ID"
                            value={agentId}
                            onChange={(e) => setAgentId(e.target.value)}
                            required
                        />
                    </div>

                    {/* Champ Passphrase */}
                    <div className={styles.formGroup}>
                        <label htmlFor="passphrase" className={styles.formLabel}>Passphrase</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="passphrase"
                            className={`${styles.formInput} ${styles.passphraseInput}`} 
                            placeholder="Enter your passphrase"
                            value={passphrase}
                            onChange={(e) => setPassphrase(e.target.value)}
                            required
                        />
                        {/* ... Bouton Toggle (Inchangé) ... */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.togglePasswordBtn}
                            aria-label={showPassword ? 'Hide passphrase' : 'Show passphrase'}
                        >
                            {/* ... SVG ici ... */}
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {showPassword ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.879 16.121A4 4 0 1012 12c.795 0 1.562.174 2.261.492M10 14l2-2m2-2l2-2m-2-2L10 14m0 0l2 2m-2-2L10 14"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                )}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Secure session & Lost credentials (Inchangés) */}
                    <div className={styles.optionsRow}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkboxInput}/>
                            <span className={styles.checkboxSpan}>Secure session</span>
                        </label>
                        <a href="#" className={styles.link}>Lost credentials?</a>
                    </div>

                    {/* Bouton Authenticate */}
                    <button
                        type="submit"
                        className={styles.authButton}
                    >
                        Authenticate
                    </button>
                </form>

                <p className={styles.monitoringText}>System access is monitored and recorded</p>
            </div>
        </div>
    );
};

export default LoginPage;