// Fichier : MissionAcceptanceModal.jsx (Version finale intégrant la modale de confirmation)

import React, { useState } from 'react';
import styles from './MissionAcceptanceModal.module.css';
import MissionConfirmationModal from '../MissionConfirmationModal/MissionConfirmationModal'; // Importation de la modale de confirmation

// --- Icônes ---
const CrossIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
);
const PinIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
);


const MissionAcceptanceModal = ({ onClose }) => {
    
    // État pour contrôler l'affichage de la modale de confirmation
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Données mock de la cible pour affichage
    const target = { 
        name: 'Victor Novikov', 
        location: 'Paris, France', 
        bounty: '$1,500,000',
        threatLevel: 'Critical'
    };
    
    // Logique appelée quand l'utilisateur clique sur 'Accept Contract'
    const handleAccept = () => {
        // Ouvre la modale de confirmation (qui est plus petite)
        setIsConfirmationOpen(true);
    };

    // Ferme uniquement la modale d'acceptation (utile pour le bouton Decline ou la croix)
    const handleCloseAcceptance = (e) => {
        // Empêche la propagation si l'appel vient de l'overlay (pour éviter une double fermeture)
        if (e) e.stopPropagation(); 
        onClose();
    };
    
    // Ferme la modale de confirmation ET la modale d'acceptation en arrière-plan
    const handleCloseConfirmation = () => {
        setIsConfirmationOpen(false);
        onClose(); 
    };

    // Rendu conditionnel : si la confirmation est ouverte, on la rend à la place.
    if (isConfirmationOpen) {
        return (
            <MissionConfirmationModal 
                onClose={handleCloseConfirmation} 
                onGoToDashboard={handleCloseConfirmation}
                onPrepareEquipment={handleCloseConfirmation}
            />
        );
    }
    
    // Rendu de la modale d'Acceptation (Affiché par défaut)
    return (
        <div className={styles.modalOverlay} onClick={handleCloseAcceptance}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                
                {/* En-tête */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Contract Briefing & Acceptance</h2>
                    <button className={styles.modalCloseButton} onClick={handleCloseAcceptance}>
                        <CrossIcon className={styles.iconSmall} />
                    </button>
                </div>

                {/* Alerte */}
                <div className={styles.modalAlert}>
                    <p>⚠️ Acceptance of this contract implies agreement with all terms. Failure to comply with the primary objective will result in immediate termination.</p>
                </div>
                
                {/* Résumé du Contrat */}
                <h3 className={styles.contractSummaryTitle}>CONTRACT SUMMARY: Operation SANGUINE</h3>
                <div className={styles.contractSummaryGrid}>
                    <div className={styles.infoRowModal}>
                        <span className={styles.infoLabel}>Target</span>
                        <span>{target.name}</span>
                    </div>
                    <div className={styles.infoRowModal}>
                        <span className={styles.infoLabel}>Location</span>
                        <span>{target.location}</span>
                    </div>
                    <div className={styles.infoRowModal}>
                        <span className={styles.infoLabel}>Bounty</span>
                        <span className={styles.bountyValue}>{target.bounty}</span>
                    </div>
                    <div className={styles.infoRowModal}>
                        <span className={styles.infoLabel}>Threat Level</span>
                        <span className={styles.threatCritical}>{target.threatLevel}</span>
                    </div>
                </div>
                
                {/* Conteneur de la Carte */}
                <h3 className={styles.mapTitle}>MISSION OVERVIEW MAP</h3>
                <div className={styles.mapContainer}>
                    <div className={styles.mapContent}>
                        <PinIcon className={styles.mapPinIcon} />
                        <p className={styles.mapText}>**Map Visualization Placeholder**</p>
                        <p className={styles.mapTextSmall}>Target currently located near the Palais de Walewska.</p>
                    </div>
                </div>

                {/* Objectifs Primaires */}
                <h3 className={styles.primaryObjectivesTitle}>PRIMARY OBJECTIVES (Must be completed)</h3>
                <ul className={styles.primaryObjectivesList}>
                    <li><input type="checkbox" disabled checked /><span>Neutralize Victor Novikov.</span></li>
                    <li><input type="checkbox" disabled checked /><span>Ensure silent execution.</span></li>
                    <li><input type="checkbox" disabled checked /><span>Secure required intelligence data.</span></li>
                </ul>

                {/* Termes d'Acceptation */}
                <h3 className={styles.acceptanceTermsTitle}>ACCEPTANCE TERMS</h3>
                <ul className={styles.acceptanceTermsList}>
                    <li>All expenses are prepaid by the agency; unauthorized costs will be deducted from your fee.</li>
                    <li>The agency is not liable for collateral damage exceeding the pre-approved risk assessment.</li>
                    <li>Once accepted, the contract is active until completed or officially terminated by Command.</li>
                </ul>

                {/* Boutons d'Action */}
                <div className={styles.modalActions}>
                    <button className={styles.declineButton} onClick={handleCloseAcceptance}>
                        Decline Contract
                    </button>
                    <button className={styles.acceptContractButtonModal} onClick={handleAccept}>
                        Accept Contract
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MissionAcceptanceModal;