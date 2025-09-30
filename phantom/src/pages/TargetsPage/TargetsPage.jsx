// Fichier : TargetsPage.jsx

import React, { useState } from 'react';
import styles from './TargetsPage.module.css';

// ----------------------------------------------------------------------
// IMPORTATION DU NOUVEAU COMPOSANT DE LA MODALE
// ----------------------------------------------------------------------
import MissionAcceptanceModal from '../MissionAcceptanceModal/MissionAcceptanceModal'; 

// --- Icônes (Inchangées) ---
const TargetIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-2.239 3-5s-1.343-5-3-5-3 2.239-3 5 1.343 5 3 5z"/></svg>
);
const FilterIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v7l-4 4v-7a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
);
const UserIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
);
const ArrowLeftIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
);


// --- Données Mock Détaillées (Inchangées) ---
const TARGETS_DATA = [
    { 
        id: 'T-920', 
        name: 'Victor Novikov', 
        location: 'Paris, France', 
        status: 'Active',
        profession: 'Former KGB Agent',
        threatLevel: 'Critical',
        bounty: '$1,500,000',
        security: 'High - Close Protection Team',
        background: 'Former Soviet agent turned fashion mogul. Suspected of running a global spy network hidden beneath his clothing line, Sanguine. Novikov est très paranoïaque et voyage rarement sans protection rapprochée. Ses déplacements se limitent souvent aux capitales européennes.',
        knownHabits: ['Assiste régulièrement aux défilés de mode Sanguine.', 'Collectionne l\'art classique.', 'Rencontres discrètes avec des contacts diplomatiques.'],
    },
    { 
        id: 'T-601', 
        name: 'Silvio Caruso', 
        location: 'Sapienza, Italy', 
        status: 'Active',
        profession: 'Bioengineer',
        threatLevel: 'Critical',
        bounty: '$1,000,000',
        security: 'Moderate - Private security and lab personnel',
        background: 'Virologue de renom travaillant sur un virus capable de cibler des séquences d\'ADN spécifiques. Réside dans sa villa familiale sur la côte italienne.',
        knownHabits: ['Promenade quotidienne dans le jardin à 9h00.', 'Travaille dans le laboratoire souterrain de 10h00 à 16h00.', 'Déjeune seul dans son bureau à 13h00.', 'Quitte rarement l\'enceinte de la villa.'],
    },
    { id: 'T-780', name: 'Sierra Knox', location: 'Miami, USA', status: 'Active' },
    { id: 'T-125', name: 'Athena Savalas', location: 'New York, USA', status: 'Inactive' },
    { id: 'T-844', name: 'Zoe Washington', location: 'Isle of Sgail, North Atlantic', status: 'Active' },
    { id: 'T-302', name: 'Vanya Shah', location: 'Mumbai, India', status: 'Pending' },
];

// --- TargetListItem (Inchangé) ---
const TargetListItem = ({ target, isSelected, onClick }) => (
    <div 
        className={`${styles.targetItem} ${isSelected ? styles.targetItemSelected : ''}`} 
        onClick={() => onClick(target)}
    >
        <UserIcon className={styles.targetUserIcon} />
        <div className={styles.targetInfo}>
            <h4 className={styles.targetName}>{target.name}</h4>
            <p className={styles.targetLocation}>{target.location}</p>
        </div>
    </div>
);


// --- TargetDetailsPanel (COMPOSANT MODIFIÉ) ---
const TargetDetailsPanel = ({ target, onViewDossier }) => {
    
    // ----------------------------------------------------------------------
    // ÉTAT DE LA MODALE
    // ----------------------------------------------------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!target || !target.profession) { 
        const fullTarget = TARGETS_DATA.find(t => t.id === (target ? target.id : null));
        if (fullTarget && fullTarget.profession) {
            target = fullTarget;
        } else if (!target) {
            return (
                <div className={styles.targetDetailsPanel}>
                    <div className={styles.noTargetSelected}>
                        <UserIcon className={styles.largeUserIcon} />
                        <p>Select a target from the list to view detailed information</p>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={`${styles.targetDetailsPanel} ${styles.detailsActive}`}>
            
            {/* 1. En-tête (Fixe) */}
            <div className={styles.detailsHeader}>
                <div className={styles.detailsTitles}>
                    <h2 className={styles.detailsTitle}>{target.name} ({target.id})</h2>
                    <p className={styles.detailsProfession}>{target.profession}</p>
                </div>
                <div className={`${styles.statusBadge} ${target.status === 'Active' ? styles.statusActiveBadge : styles.statusPendingBadge}`}>
                    {target.status}
                </div>
            </div>

            {/* 2. Contenu Défilant */}
            <div className={styles.scrollableDetailsContent}>
                <div className={styles.detailsGrid}>
                    
                    <div className={styles.profileSection}>
                        <h3 className={styles.sectionTitle}>Target Profile</h3>
                        <div className={styles.infoRow}><span className={styles.infoLabel}>Location</span><span>{target.location}</span></div>
                        <div className={styles.infoRow}><span className={styles.infoLabel}>Threat Level</span><span className={target.threatLevel === 'Critical' ? styles.threatCritical : styles.threatNormal}>{target.threatLevel}</span></div>
                        <div className={styles.infoRow}><span className={styles.infoLabel}>Bounty</span><span className={styles.bountyValue}>{target.bounty}</span></div>
                        <div className={styles.infoRow}><span className={styles.infoLabel}>Security</span><span>{target.security}</span></div>
                    </div>

                    <div className={styles.habitsSection}>
                        <h3 className={styles.sectionTitle}>Known Habits</h3>
                        <ul className={styles.habitsList}>
                            {target.knownHabits && target.knownHabits.map((habit, i) => (
                                <li key={i}>{habit}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className={styles.backgroundSection}>
                    <h3 className={styles.sectionTitle}>Background</h3>
                    <p className={styles.backgroundText}>{target.background}</p>
                </div>
            </div>

            {/* 3. Actions (Hors Carte) - MODIFIÉ */}
            <div className={styles.detailsActions}>
                <button 
                    className={styles.fullDossierButton}
                    onClick={() => onViewDossier(target)}
                >
                    Full Dossier
                </button>
                <button 
                    className={styles.acceptContractButton}
                    onClick={openModal} /* <--- CONNECTÉ AU POPUP */
                >
                    Accept Contract
                </button>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* RENDU CONDITIONNEL DE LA MODALE */}
            {/* ---------------------------------------------------------- */}
            {isModalOpen && <MissionAcceptanceModal onClose={closeModal} />}
        </div>
    );
};


// --- TargetFullDossier (Inchangé) ---
const TargetFullDossier = ({ target, onClose }) => {
// ... code de TargetFullDossier (inchangé)
    const [activeTab, setActiveTab] = useState('Profile');
    
    const ProfileImagePlaceholder = ({ name }) => (
        <div className={styles.profileImageContainer}>
            <div className={styles.profileImagePlaceholder}>
                <UserIcon className={styles.dossierUserIcon} />
            </div>
            <div className={styles.profileMeta}>
                <h2 className={styles.dossierName}>{name}</h2>
                <p className={styles.dossierProfession}>{target.profession}</p>
                
                <div className={`${styles.statusBadgeDossier} ${target.status === 'Active' ? styles.statusActiveBadge : styles.statusPendingBadge}`}>
                    {target.status}
                </div>
                
                <p className={styles.dossierLocation}>📍 {target.location}</p>
                <p className={styles.dossierThreat}>⚠️ Threat Level: <span className={target.threatLevel === 'Critical' ? styles.threatCritical : styles.threatNormal}>{target.threatLevel}</span></p>
                <p className={styles.dossierBounty}>💰 Bounty: <span className={styles.bountyValueDossier}>{target.bounty}</span></p>

            </div>
            
            <div className={styles.securityAssessment}>
                <h3 className={styles.sectionTitle}>Security Assessment</h3>
                <p className={styles.securityDetail}>Level: <span>Moderate</span></p>
                <p className={styles.securityDetail}>Personnel: <span>12 guards</span></p>
                <p className={styles.securityDetail}>Surveillance: <span>Throughout villa and lab areas</span></p>
                <p className={styles.securityDetail}>Access Control: <span>Biometric access to laboratory</span></p>
                <p className={styles.securityDetail}>Details: <span>{target.security}</span></p>
            </div>
        </div>
    );
    
    const DossierContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <div className={styles.tabContent}>
                        <h3 className={styles.contentTitle}>Background</h3>
                        <p className={styles.contentText}>{target.background}</p>
                        
                        <h3 className={styles.contentTitle}>Intelligence Summary</h3>
                        <p className={styles.contentText}>Synthèse des informations clés concernant les activités et l'impact de la cible sur les marchés noirs et les politiques internationales. Cible à haute valeur ajoutée.</p>
                        
                        <div className={styles.habitsBox}>
                            <h3 className={styles.boxTitle}>Known Habits</h3>
                            <ul className={styles.habitsListDossier}>
                                {target.knownHabits.map((habit, i) => (
                                    <li key={i}>🔴 {habit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'Schedule':
                return <div className={styles.tabContent}><p className={styles.contentText}>Schedule details coming soon...</p></div>;
            case 'Associates':
                return <div className={styles.tabContent}><p className={styles.contentText}>Associate data unavailable...</p></div>;
            case 'Locations':
                return <div className={styles.tabContent}><p className={styles.contentText}>Location history is being compiled...</p></div>;
            default:
                return null;
        }
    };

    return (
        <div className={styles.fullDossierContainer}>
            
            <div className={styles.dossierHeader}>
                <button className={styles.backButton} onClick={onClose}>
                    <ArrowLeftIcon className={styles.backIcon} />
                    Target Profile
                </button>
            </div>
            
            <div className={styles.dossierContentWrapper}>
                
                {/* Colonne Gauche : Image et Métadonnées */}
                <ProfileImagePlaceholder name={target.name} />
                
                {/* Colonne Droite : Onglets d'Information */}
                <div className={styles.dossierInfoTabs}>
                    
                    <div className={styles.tabBarDossier}>
                        {['Profile', 'Schedule', 'Associates', 'Locations'].map(tab => (
                            <button
                                key={tab}
                                className={`${styles.dossierTab} ${activeTab === tab ? styles.dossierTabActive : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    
                    {DossierContent()}

                    <div className={styles.detailsActionsDossier}>
                        <button className={styles.acceptContractButtonDossier}>Accept Contract</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
};


// ----------------------------------------------------------------------
// Composant Principal de la Page Cibles (Inchangé)
// ----------------------------------------------------------------------

const TargetsPage = () => {
    const [selectedTarget, setSelectedTarget] = useState(null);
    const [isDossierOpen, setIsDossierOpen] = useState(false);

    const handleViewDossier = (target) => {
        const fullTargetData = TARGETS_DATA.find(t => t.id === target.id); 
        if (fullTargetData) {
            setSelectedTarget(fullTargetData);
            setIsDossierOpen(true);
        } else {
            console.error("Données complètes de la cible non trouvées !");
        }
    };

    const handleCloseDossier = () => {
        setIsDossierOpen(false);
    };

    if (isDossierOpen && selectedTarget) {
        return <TargetFullDossier target={selectedTarget} onClose={handleCloseDossier} />;
    }

    return (
        <div className={styles.targetPageContent}>
            
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Target Database</h1>
                <p className={styles.briefing}>High-value individuals with active contracts</p>
            </div>

            <div className={styles.targetActionBar}>
                <input 
                    type="text" 
                    placeholder="Search targets..."
                    className={styles.targetSearchInput}
                />
                <button className={styles.actionButton}>
                    <FilterIcon className={styles.iconSmall} />Filter
                </button>
            </div>

            <div className={styles.masterDetailContainer}>
                
                <div className={styles.targetMasterList}>
                    <h3 className={styles.listTitle}>Target List</h3>
                    <div className={styles.targetListWrapper}>
                        {TARGETS_DATA.map((target) => (
                            <TargetListItem 
                                key={target.id} 
                                target={target} 
                                isSelected={selectedTarget && selectedTarget.id === target.id}
                                onClick={setSelectedTarget}
                            />
                        ))}
                    </div>
                </div>

                <TargetDetailsPanel 
                    target={selectedTarget} 
                    onViewDossier={handleViewDossier}
                />

            </div>
        </div>
    );
};

export default TargetsPage;