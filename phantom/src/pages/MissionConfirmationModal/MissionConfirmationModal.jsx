// Fichier : MissionConfirmationModal.jsx

import React from 'react';
import styles from './MissionConfirmationModal.module.css';

// Icônes
// Icône de validation (Check Circle)
const CheckCircleIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
);
// Icône de fermeture (Cross)
const CrossIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
);

// Données mock pour la confirmation
const TARGET_NAME = "Victor Novikov"; // Ou utiliser une prop si la donnée était passée

const MissionConfirmationModal = ({ onClose, onGoToDashboard, onPrepareEquipment }) => {

    // Simuler des actions de navigation (juste pour la démo)
    const handleGoToDashboard = () => {
        alert("Navigating to Dashboard...");
        onGoToDashboard ? onGoToDashboard() : onClose();
    };

    const handlePrepareEquipment = () => {
        alert("Navigating to Equipment Loadout...");
        onPrepareEquipment ? onPrepareEquipment() : onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                
                {/* En-tête (Légèrement plus petit) */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Contract Confirmed</h2>
                    <button className={styles.modalCloseButton} onClick={onClose}>
                        <CrossIcon className={styles.iconSmall} />
                    </button>
                </div>
                
                {/* Corps de la Confirmation */}
                <div className={styles.confirmationBody}>
                    
                    <CheckCircleIcon className={styles.successIcon} />
                    
                    <h3 className={styles.missionAcceptedTitle}>Mission Accepted</h3>
                    
                    <p className={styles.confirmationText}>
                        Contract for the elimination of **{TARGET_NAME}** has been confirmed.
                    </p>
                    
                    <h4 className={styles.nextStepsTitle}>Next Steps</h4>
                    
                    <ul className={styles.nextStepsList}>
                        <li><span>1</span>Review mission briefing and intelligence</li>
                        <li><span>2</span>Select your equipment loadout</li>
                        <li><span>3</span>Proceed to mission location</li>
                    </ul>

                </div>

                {/* Boutons d'Action */}
                <div className={styles.modalActions}>
                    <button className={styles.returnButton} onClick={handleGoToDashboard}>
                        Return to Dashboard
                    </button>
                    <button className={styles.prepareEquipmentButton} onClick={handlePrepareEquipment}>
                        Prepare Equipment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MissionConfirmationModal;