import React from 'react';
import styles from './AgentProfile.module.css';

// --- Icônes Spécifiques à cette page ---
const UserOutlineIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
);
const SkillIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6a2 2 0 00-2-2H5a2 2 0 00-2 2v13m11 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v12m7 0v-9a2 2 0 00-2-2h-2a2 2 0 00-2 2v9"/></svg>
);
const AchievementIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
);
const CheckIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
);

// --- Données Mock pour le Profil de l'Agent ---
const AGENT_PROFILE_DATA = {
    name: 'Agent 47',
    alias: 'Elite Operative',
    codename: 'Hitman',
    status: 'Active',
    clearance: 'Level 10',
    missionsCompleted: 324,
    successRate: '98.7%',
    skills: [
        { name: 'Marksmanship', value: 95 },
        { name: 'Stealth', value: 90 },
        { name: 'Combat', value: 85 },
        { name: 'Intelligence', value: 88 },
        { name: 'Endurance', value: 80 },
    ],
    achievements: [
        { name: 'Silent Assassin', description: 'Complete 50 missions without being detected', completed: true },
        { name: 'Master of Disguise', description: 'Use 100 different disguises', completed: true },
        { name: 'Perfect Shot', description: '100 headshots from over 100 meters', completed: true },
        { name: 'Ghost', description: 'Complete all missions without raising alarms', completed: false },
        { name: 'Legendary', description: 'Eliminate 1000 targets', completed: false },
    ]
};

const AgentProfile = () => {
    const agent = AGENT_PROFILE_DATA; // Récupère les données de l'agent

    return (
        <div className={styles.agentProfilePage}>
            
            {/* En-tête de la Page */}
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Agent Profile</h1>
                <p className={styles.briefing}>Personal information and performance</p>
            </div>

            {/* Contenu principal en grille */}
            <div className={styles.mainContentGrid}>
                
                {/* Colonne Gauche : Informations Générales de l'Agent */}
                <div className={styles.agentInfoCard}>
                    <UserOutlineIcon className={styles.agentAvatar} />
                    <h2 className={styles.agentName}>{agent.name}</h2>
                    <p className={styles.agentAlias}>{agent.alias}</p>

                    <div className={styles.infoRow}><span className={styles.infoLabel}>Codename</span><span>{agent.codename}</span></div>
                    <div className={styles.infoRow}><span className={styles.infoLabel}>Status</span><span className={styles.statusActive}>{agent.status}</span></div>
                    <div className={styles.infoRow}><span className={styles.infoLabel}>Clearance</span><span>{agent.clearance}</span></div>
                    <div className={styles.infoRow}><span className={styles.infoLabel}>Missions</span><span>{agent.missionsCompleted} Completed</span></div>
                    <div className={styles.infoRow}><span className={styles.infoLabel}>Success Rate</span><span>{agent.successRate}</span></div>

                    <button className={styles.editProfileButton}>Edit Profile</button>
                </div>

                {/* Colonne Droite : Évaluation des Compétences et Succès */}
                <div className={styles.rightColumn}>
                    
                    {/* Carte : Évaluation des Compétences */}
                    <div className={styles.skillAssessmentCard}>
                        <h3 className={styles.cardTitle}><SkillIcon className={styles.cardIcon} /> Skill Assessment</h3>
                        {agent.skills.map((skill, index) => (
                            <div key={index} className={styles.skillBarContainer}>
                                <span className={styles.skillName}>{skill.name}</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${skill.value}%` }}></div>
                                </div>
                                <span className={styles.skillValue}>{skill.value}/100</span>
                            </div>
                        ))}
                    </div>

                    {/* Carte : Succès */}
                    <div className={styles.achievementsCard}>
                        <h3 className={styles.cardTitle}><AchievementIcon className={styles.cardIcon} /> Achievements</h3>
                        <div className={styles.achievementsList}>
                            {agent.achievements.map((achievement, index) => (
                                <div key={index} className={`${styles.achievementItem} ${achievement.completed ? styles.achievementCompleted : ''}`}>
                                    <div className={styles.achievementCheck}>
                                        {achievement.completed && <CheckIcon className={styles.checkIcon} />}
                                    </div>
                                    <div className={styles.achievementText}>
                                        <h4 className={styles.achievementName}>{achievement.name}</h4>
                                        <p className={styles.achievementDescription}>{achievement.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div> {/* Fin rightColumn */}

            </div> {/* Fin mainContentGrid */}
        </div>
    );
};

export default AgentProfile;