// Fichier : MissionBoardPage.jsx - VERSION INTÉGRÉE V2

import React, { useState } from 'react';
import styles from './MissionBoardPage.module.css';
import GlassStatsCard from '../../components/GlassStatsCard/GlassStatsCard'; 
import MissionDetailsModal from '..//MissionDetailsModal/MissionDetailsModal'; // <-- IMPORT NOUVEAU

// --- Icônes SVG pour la Page Missions (Inchangées) ---
// Location
const LocationIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
);
// Filter Icon
const FilterIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v7l-4 4v-7a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
);
// Sort Icon
const SortIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0h3m-3 4h3m-6 0h3m-3 4h2m-2-4v4m0-4h4m-4-4v4m0-4h4m-4-4v4m0-4h4"/></svg>
);

// --- Données Mock Complètes pour la page Missions (Inchangées) ---
const FULL_MISSIONS_DATA = [
    { target: 'Victor Novikov', status: 'Active', location: 'Paris, France', priority: 'High', reward: '750,000 USD', eta: '48h', id: 'M-7842' },
    { target: 'Silvio Caruso', status: 'Pending', location: 'Sapienza, Italy', priority: 'Medium', reward: '500,000 USD', eta: '72h', id: 'M-6391' },
    { target: 'Jordan Cross', status: 'Active', location: 'Bangkok, Thailand', priority: 'Critical', reward: '1,200,000 USD', eta: '24h', id: 'M-9103' },
    { target: 'Ken Morgan', status: 'Active', location: 'Bangkok, Thailand', priority: 'Medium', reward: '400,000 USD', eta: '36h', id: 'M-5273' },
    { target: 'Sierra Knox', status: 'Pending', location: 'Miami, USA', priority: 'High', reward: '850,000 USD', eta: '96h', id: 'M-3842' },
    { target: 'Athena Savalas', status: 'Active', location: 'New York, USA', priority: 'Critical', reward: '1,000,000 USD', eta: '48h', id: 'M-2957' },
    { target: 'Zoe Washington', status: 'Pending', location: 'Isle of Sgail', priority: 'Medium', reward: '600,000 USD', eta: '5 days', id: 'M-1122' },
    { target: 'Vanya Shah', status: 'Active', location: 'Mumbai, India', priority: 'High', reward: '950,000 USD', eta: '72h', id: 'M-4455' },
    { target: 'Robert Knox', status: 'Completed', location: 'Miami, USA', priority: 'Low', reward: '300,000 USD', eta: '2 days', id: 'M-6677' },
];

// --- Composant Mission Card (MODIFIÉ pour recevoir un handler) ---
const MissionCard = ({ mission, onDetailsClick }) => { // <-- Ajout de onDetailsClick
    const priorityClass = 
        mission.priority === 'High' || mission.priority === 'Critical' ? styles.priorityHigh :
        mission.priority === 'Medium' ? styles.priorityMedium : '';

    return (
        <GlassStatsCard>
            <div className={styles.missionCardLayout}>
                {/* ... Content ... */}
                <div className={styles.missionContent}>
                    <div className={styles.missionCardHeader}>
                        <h4 className={styles.targetName}>{mission.target}</h4>
                        <span className={mission.status === 'Active' ? styles.statusActive : styles.statusPending}>
                            {mission.status}
                        </span>
                    </div>
                    
                    <p className={styles.location}>
                        <LocationIcon className={styles.iconSmall} style={{ color: 'var(--color-text-medium)'}}/> 
                        {mission.location}
                    </p>
                    
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Deadline:</span>
                        <span className={styles.detailValue}>{mission.eta}</span>
                    </div>
                    
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Priority:</span>
                        <span className={`${styles.detailValue} ${priorityClass}`}>{mission.priority}</span>
                    </div>
                     {mission.reward && (
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Reward:</span>
                            <span className={`${styles.detailValue} ${styles.currency}`}>{mission.reward}</span>
                        </div>
                    )}
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>ID:</span>
                        <span className={styles.detailValue}>{mission.id}</span>
                    </div>
                </div>

                <div className={styles.missionFooter}>
                    {/* Ajout de l'événement onClick pour ouvrir la modale */}
                    <button 
                        className={`${styles.actionButton} ${styles.detailsButton}`}
                        onClick={() => onDetailsClick(mission)} // <-- Passe l'objet mission
                    >
                        Details
                    </button>
                    <button className={`${styles.actionButton} ${styles.acceptButton}`}>
                         {mission.status === 'Completed' ? 'View Report' : 'Accept'}
                    </button>
                </div>
            </div>
        </GlassStatsCard>
    );
};


// --- Composant principal de la Page Missions (MODIFIÉ) ---
const MissionBoardPage = () => {
    const [missionFilter, setMissionFilter] = useState('All Missions');
    const [searchTerm, setSearchTerm] = useState('');
    
    // **************************************
    // NOUVEAU: État pour la modale de détails
    // **************************************
    const [selectedMission, setSelectedMission] = useState(null);

    // Fonction pour ouvrir la modale et passer les données de la mission
    const handleOpenDetails = (missionData) => {
        // En pratique, vous voudriez peut-être charger toutes les données de mission ici (simulé par missionData)
        setSelectedMission(missionData);
    };

    // Fonction pour fermer la modale
    const handleCloseDetails = () => {
        setSelectedMission(null);
    };

    // Fonctions de simulation d'action (pour les boutons dans la modale de détails)
    const handleAccept = () => {
        alert(`Contract for ${selectedMission.target} accepted!`);
        handleCloseDetails();
    };

    const handleRequestIntel = () => {
        alert(`Requesting additional intelligence for ${selectedMission.target}.`);
        // Ici, vous pourriez laisser la modale ouverte ou la fermer, selon l'UX
    };

    // Logique de filtrage des missions (Inchangée)
    const filteredMissions = FULL_MISSIONS_DATA
        .filter(mission => {
            // Filtrage par terme de recherche (Target ou Location)
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = mission.target.toLowerCase().includes(searchLower) ||
                                  mission.location.toLowerCase().includes(searchLower);

            if (!matchesSearch) return false;

            // Filtrage par onglet (All, Active, Pending)
            if (missionFilter === 'All Missions') return true;
            if (missionFilter === 'Active') return mission.status === 'Active';
            if (missionFilter === 'Pending') return mission.status === 'Pending';
            if (missionFilter === 'Completed') return mission.status === 'Completed';
            return true;
        });

    return (
        <div className={styles.missionPageContent}>
            
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Mission Board</h1>
                <p className={styles.briefing}>Available contracts for your clearance level. Total Missions: {filteredMissions.length}</p>
            </div>

            {/* Barre de Recherche et Boutons d'Action (Inchangés) */}
            <div className={styles.missionActionBar}>
                <input 
                    type="text" 
                    placeholder="Search targets or locations..." 
                    className={styles.missionSearchInput} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={`${styles.actionButton} ${styles.missionActionButton}`}>
                    <FilterIcon className={styles.iconSmall} />Filter
                </button>
                <button className={`${styles.actionButton} ${styles.missionActionButton}`}>
                    <SortIcon className={styles.iconSmall} />Sort
                </button>
            </div>

            {/* Onglets de Filtrage (Inchangés) */}
            <div className={styles.missionTabs}>
                {['All Missions', 'Active', 'Pending', 'Completed'].map(tab => (
                    <button 
                        key={tab}
                        className={`${styles.missionTab} ${missionFilter === tab ? styles.missionTabActive : ''}`}
                        onClick={() => setMissionFilter(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Grille des Missions (MODIFIÉ pour passer le handler) */}
            <div className={styles.missionsGrid}>
                {filteredMissions.length > 0 ? (
                    filteredMissions.map((mission, index) => (
                        <MissionCard 
                            key={index} 
                            mission={mission} 
                            onDetailsClick={handleOpenDetails} // <-- PASSAGE DU HANDLER
                        />
                    ))
                ) : (
                    <div className={styles.noResults}>
                        No missions found matching your criteria. Try adjusting the search or filters.
                    </div>
                )}
            </div>
            
            {/* ************************************** */}
            {/* Rendu de la Modale de Détails */}
            {/* ************************************** */}
            {selectedMission && (
                <MissionDetailsModal
                    // Note: La modale MissionDetailsModal utilise des données mock pour le briefing, etc.
                    // En production, vous passeriez selectedMission comme prop 'data'.
                    onClose={handleCloseDetails}
                    onAcceptMission={handleAccept}
                    onRequestIntel={handleRequestIntel}
                    onSaveForLater={handleCloseDetails}
                />
            )}
            
        </div>
    );
};

export default MissionBoardPage;