// Fichier : MissionDetailsModal.jsx

import React from 'react';
import styles from './MissionDetailsModal.module.css';

// --- Icônes ---
// Icône de flèche pour le retour
const ArrowLeftIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
);
// Icône de fermeture (Cross)
const CrossIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
);
// Icône de marqueur de liste
const DotIcon = (props) => (
    <svg {...props} fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
);


// Données mock pour la mission
const missionData = {
    title: 'Silent Nightingale',
    location: 'Bangkok, Thailand',
    target: 'Jordan Cross',
    id: 'M-9103',
    reward: '$1,200,000',
    priority: 'Critical',
    briefing: "Jordan Cross, frontman of The Class, is staying at the Himmapan Hotel in Bangkok where the band is recording their latest album. Cross is responsible for the death of Hannah Highmoore, daughter of a wealthy media mogul. Your mission is to eliminate Cross and retrieve any evidence related to Hannah's death.",
    objectives: [
        'Eliminate Jordan Cross',
        "Retrieve the recording from Cross's suite",
        'Exit the hotel undetected'
    ],
    complications: [
        "Cross's manager, Dexy Barat, is always nearby",
        "Hotel security cameras cover most public areas",
        "The recording studio is soundproof and isolated"
    ],
    intelligence: [
        "Cross rarely leaves the recording studio on the top floor",
        "Security is moderate with private bodyguards",
        "The hotel is hosting a birthday celebration for Cross",
        "Several staff members have access to Cross's suite"
    ]
};

const MissionDetailsModal = ({ onClose, onAcceptMission, onRequestIntel, onSaveForLater }) => {

    const handleBack = () => {
        // Logique de retour, si cette modale est un pop-up d'une liste
        alert("Back to Mission List");
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                
                {/* En-tête */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>
                        <ArrowLeftIcon className={styles.backIcon} onClick={handleBack} />
                        Mission Details: {missionData.title}
                    </h2>
                    <button className={styles.modalCloseButton} onClick={onClose}>
                        <CrossIcon className={styles.iconSmall} />
                    </button>
                </div>

                <div className={styles.modalBodyGrid}>
                    
                    {/* Colonne Gauche (Briefing, Objectifs, Complications, Intelligence) */}
                    <div className={styles.leftColumn}>
                        
                        <div className={styles.statusRow}>
                            <span className={styles.statusTitle}>Location:</span>
                            <span className={styles.locationText}>{missionData.location}</span>
                            <span className={styles.statusActive}>Active</span>
                        </div>
                        
                        {/* 1. Briefing */}
                        <h3 className={styles.sectionTitle}>BRIEFING</h3>
                        <p className={styles.briefingText}>
                            {missionData.briefing}
                        </p>

                        {/* 2. Objectifs */}
                        <h3 className={styles.sectionTitle}>OBJECTIVES</h3>
                        <ul className={styles.detailsList}>
                            {missionData.objectives.map((obj, index) => (
                                <li key={`obj-${index}`}><DotIcon className={styles.listDotRed} />{obj}</li>
                            ))}
                        </ul>

                        {/* 3. Complications */}
                        <h3 className={styles.sectionTitle}>COMPLICATIONS</h3>
                        <ul className={styles.detailsList}>
                            {missionData.complications.map((comp, index) => (
                                <li key={`comp-${index}`}><DotIcon className={styles.listDotYellow} />{comp}</li>
                            ))}
                        </ul>

                        {/* 4. Intelligence */}
                        <h3 className={styles.sectionTitle}>INTELLIGENCE</h3>
                        <ul className={styles.detailsList}>
                            {missionData.intelligence.map((intel, index) => (
                                <li key={`intel-${index}`}><DotIcon className={styles.listDotMedium} />{intel}</li>
                            ))}
                        </ul>

                    </div>

                    {/* Colonne Droite (Statistiques de Mission et Actions) */}
                    <div className={styles.rightColumn}>
                        
                        {/* Target Summary Card */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>TARGET</h4>
                            <p className={styles.cardText}>{missionData.target}</p>
                            <p className={styles.cardSubText}>Musician & Record Producer</p>
                            <button className={styles.viewProfileButton}>View Full Profile</button>
                        </div>

                        {/* Mission Details Card */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>MISSION DETAILS</h4>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>ID</span>
                                <span className={styles.infoValue}>{missionData.id}</span>
                            </div>
                             <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Venue</span>
                                <span className={styles.infoValue}>Himmapan Hotel</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Deadline</span>
                                <span className={styles.infoValue}>24 hours</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Priority</span>
                                <span className={styles.threatCritical}>{missionData.priority}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Reward</span>
                                <span className={styles.bountyValue}>{missionData.reward}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actionsCard}>
                            <h4 className={styles.cardTitle}>ACTIONS</h4>
                            <button className={styles.acceptMissionButton} onClick={onAcceptMission}>
                                Accept Mission
                            </button>
                            <button className={styles.secondaryActionButton} onClick={onRequestIntel}>
                                Request Additonal Intel
                            </button>
                            <button className={styles.secondaryActionButton} onClick={onSaveForLater}>
                                Save For Later
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MissionDetailsModal;