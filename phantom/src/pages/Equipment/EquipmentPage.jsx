import React, { useState } from 'react';
import styles from './EquipmentPage.module.css';

// --- Icônes Réutilisables (inchangées) ---
const DetailsIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4m-2 2v-4m-7-9l-2-2m0 0a4 4 0 118 0l-2 2m0 0l-2 2m2-2l2-2m-2 2l-2 2m-2-2l-2-2m0 0l-2 2"/></svg>
);
const SelectIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
);
const HeartIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
);
const PlusIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
);

// --- Icônes de Catégorie ---
// Weapons
const PistolIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
);
const RifleIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-4.8c0-.622-.245-1.218-.68-1.652L3.5 7.5l5-4.5 5 4.5-4.82 4.82c-.434.434-.68 1.03-.68 1.652V19M15 11l4-4m-4 4l-4-4"/></svg>
);
const KnifeIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 18l-1.4-1.4L18 10l1.4 1.4-5.4 5.4zm-6-6l-1.4-1.4L10 6l1.4 1.4-5.4 5.4zM5 21l-2-2 1.4-1.4L6.4 19 5 21z"/></svg>
);
const WireIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13l4-4m-4 0l4 4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
);
// Tools
const ToolIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464l-4.243 4.243m-1.414 1.414l-4.243 4.243M5.5 18.5L8 16m3-3l4-4m-4 0l-2-2m-4 0l-2 2M7.5 7.5L6 6m7 0l2-2m-2 2l-2 2m-4 0l-2 2m-4 0l-2 2m-2 2l2 2m-2-2l-2-2"/></svg>
);
// 🔑 Gadgets
const GadgetIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
);
// 🔑 Disguises
const DisguiseIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c3.483 0 6.53 1.875 8 4.606V21H4v-2.394C5.47 15.875 8.517 14 12 14z"/></svg>
);


// --- Fonction utilitaire pour choisir l'icône ---
const getItemIcon = (type, category) => {
    switch (category) {
        case 'Weapons':
            switch (type) {
                case 'Pistol': return PistolIcon;
                case 'Sniper Rifle': return RifleIcon;
                case 'Melee': return KnifeIcon;
                case 'Garrote': return WireIcon;
                default: return PistolIcon; 
            }
        case 'Tools':
            return ToolIcon;
        case 'Gadgets':
            return GadgetIcon; // Utilisation de la nouvelle icône Gadget
        case 'Disguises':
            return DisguiseIcon; // Utilisation de la nouvelle icône Disguise
        default:
            return HeartIcon; 
    }
};

// --- Données Mock Complètes (Ajout des Gadgets et Disguises) ---
const EQUIPMENT_DATA = [
    // --------------------------------- WEAPONS ---------------------------------
    { category: 'Weapons', id: 'W-001', type: 'Pistol', name: 'Silverballer', description: 'Signature custom pistol with integrated suppressor. High damage and accuracy.', stats: { damage: 80, accuracy: 90, concealment: 85, noise: 20 }, isFavourite: true },
    { category: 'Weapons', id: 'W-002', type: 'Sniper Rifle', name: 'Sieger 300 Ghost', description: 'Suppressed sniper rifle with subsonic ammunition. Excellent for long-range eliminations.', stats: { damage: 95, accuracy: 95, concealment: 40, noise: 15 }, isFavourite: false },
    { category: 'Weapons', id: 'W-003', type: 'Melee', name: 'Combat Knife', description: 'Standard combat knife. Silent and reliable for close-quarters eliminations.', stats: { damage: 70, accuracy: 60, concealment: 90, noise: 10 }, isFavourite: false },
    { category: 'Weapons', id: 'W-004', type: 'Garrote', name: 'Fiber Wire', description: 'Signature weapon for silent eliminations. Requires close proximity to target.', stats: { damage: 100, accuracy: 50, concealment: 98, noise: 5 }, isFavourite: true },
    // ----------------------------------- TOOLS -----------------------------------
    { category: 'Tools', id: 'T-001', type: 'Access Tool', name: 'Lockpick', description: 'Standard lockpicking set for opening mechanical locks silently.', stats: { reliability: 85, speed: 60, concealment: 95, versatility: 80 }, isFavourite: true },
    { category: 'Tools', id: 'T-002', type: 'Access Tool', name: 'Electronic Keycard Cloner', description: 'Device capable of cloning electronic keycards for secure areas.', stats: { reliability: 90, speed: 85, concealment: 70, versatility: 60 }, isFavourite: false },
    // --------------------------------- GADGETS ---------------------------------
    { category: 'Gadgets', id: 'G-001', type: 'Explosive', name: 'Remote Explosive', description: 'Remotely detonated explosive device. Useful for creating distractions or eliminations.', stats: { damage: 90, radius: 70, concealment: 60, reliability: 95 }, isFavourite: true },
    { category: 'Gadgets', id: 'G-002', type: 'Toxin', name: 'Poison Vial', description: 'Lethal poison that can be administered to food or drinks. Causes death by apparent natural causes.', stats: { lethality: 100, speed: 50, detectability: 10, versatility: 80 }, isFavourite: false },
    // --------------------------------- DISGUISES ---------------------------------
    { category: 'Disguises', id: 'D-001', type: 'Uniform', name: 'Security Guard Uniform', description: 'Standard security guard uniform. Provides access to most secure areas with minimal suspicion.', stats: { access: 70, suspicion: 40, mobility: 80, versatility: 65 }, isFavourite: false },
    { category: 'Disguises', id: 'D-002', type: 'Service', name: 'Staff Uniform', description: 'Generic staff uniform. Low suspicion and good mobility in most areas.', stats: { access: 60, suspicion: 30, mobility: 90, versatility: 75 }, isFavourite: true },
];

// --- Fonction pour obtenir les stats pertinentes ---
const getStatsForCategory = (category) => {
    switch (category) {
        case 'Weapons':
            return ['damage', 'accuracy', 'concealment', 'noise'];
        case 'Tools':
            return ['reliability', 'speed', 'concealment', 'versatility'];
        case 'Gadgets':
            // 🔑 Différentes stats pour les gadgets
            return category === 'Gadgets' && EQUIPMENT_DATA.find(i => i.category === 'Gadgets').name === 'Poison Vial'
                ? ['lethality', 'speed', 'detectability', 'versatility']
                : ['damage', 'radius', 'concealment', 'reliability'];
        case 'Disguises':
            // 🔑 Stats pour les déguisements
            return ['access', 'suspicion', 'mobility', 'versatility'];
        default:
            return ['stat1', 'stat2', 'stat3', 'stat4'];
    }
};

// --- Composant d'une carte d'équipement ---
const EquipmentCard = ({ item, onDetailsClick, onSelectClick }) => {
    const ItemIcon = getItemIcon(item.type, item.category); 
    
    // Obtient les noms de statistiques en fonction de la catégorie (ajusté pour la variété des gadgets)
    const statsToDisplay = getStatsForCategory(item.category).map(stat => stat.toLowerCase());

    return (
        <div className={styles.equipmentCard}>
            
            {/* Icônes */}
            <div className={styles.cardHeader}>
                <ItemIcon className={styles.itemTypeIcon} /> 
                <HeartIcon className={item.isFavourite ? styles.favoriteIconActive : styles.favoriteIcon} />
            </div>

            {/* Titres et Description */}
            <div className={styles.itemTitleGroup}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <p className={styles.itemType}>{item.type}</p>
            </div>

            <p className={styles.itemDescription}>{item.description}</p>
            
            {/* Statistiques (Barres de progression) */}
            <div className={styles.statsContainer}>
                {statsToDisplay.map((statName) => {
                    const value = item.stats[statName];
                    // Gestion d'un cas où la statistique n'existe pas (pour la robustesse)
                    if (value === undefined) return null; 

                    return (
                        <div key={statName} className={styles.statRow}>
                            {/* Assurez-vous que le nom de la stat est correctement capitalisé ou affiché en minuscule */}
                            <span className={styles.statName}>{statName}</span>
                            <div className={styles.statBar}>
                                <div 
                                    className={styles.statFill} 
                                    style={{ width: `${value}%` }} 
                                />
                            </div>
                            <span className={styles.statValue}>{value}/100</span>
                        </div>
                    );
                })}
            </div>

            {/* Boutons d'Action */}
            <div className={styles.cardActions}>
                <button 
                    className={styles.detailsButton}
                    onClick={() => onDetailsClick(item)}
                >
                    <DetailsIcon className={styles.buttonIcon} />Details
                </button>
                <button 
                    className={styles.selectButton}
                    onClick={() => onSelectClick(item)}
                >
                    <SelectIcon className={styles.buttonIcon} />Select
                </button>
            </div>
        </div>
    );
};

// --- Composant principal de la Page d'Équipement (Logique de filtrage mise à jour) ---
const EquipmentPage = () => {
    const [activeTab, setActiveTab] = useState('Weapons');
    const [selectedItem, setSelectedItem] = useState(null); 

    const handleDetailsClick = (item) => {
        setSelectedItem(item);
        console.log("Show detailed popup for:", item.name);
    };

    const handleSelectClick = (item) => {
        console.log(`${item.name} selected for mission.`);
    };

    // Filtrage des équipements en fonction de l'onglet actif
    const filteredEquipment = EQUIPMENT_DATA.filter(item => item.category === activeTab);

    return (
        <div className={styles.equipmentPageContent}>
            
            {/* En-tête de la Page */}
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Equipment</h1>
                <p className={styles.briefing}>Select your loadout for the mission</p>
            </div>

            {/* Barre de Navigation des Onglets (Filtres) */}
            <div className={styles.tabBar}>
                {/* TOUS LES ONGLETS SONT MAINTENANT DANS LA BARRE */}
                {['Weapons', 'Tools', 'Gadgets', 'Disguises'].map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Galerie d'Équipement (Grille) */}
            <div className={styles.equipmentGrid}>
                
                {filteredEquipment.map(item => (
                    <EquipmentCard 
                        key={item.id}
                        item={item}
                        onDetailsClick={handleDetailsClick}
                        onSelectClick={handleSelectClick}
                    />
                ))}

                {/* Carte "Add New Equipment" */}
                <div className={styles.addNewCard}>
                    <PlusIcon className={styles.plusIcon} />
                    <p>Add New Equipment</p>
                </div>

            </div>
        </div>
    );
};

export default EquipmentPage;