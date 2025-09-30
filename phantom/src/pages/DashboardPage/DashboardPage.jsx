import React, { useState } from 'react';
import styles from './DashboardPage.module.css';
import GlassStatsCard from '../../components/GlassStatsCard/GlassStatsCard'; 
import AgentProfile from '../AgentProfile/AgentProfile';
import EquipmentPage from '../Equipment/EquipmentPage';
// 🔑 Import du nouveau composant MissionBoardPage
import MissionBoardPage from '../MissionBoardPage/MissionBoardPage'; 
import TargetsPage from '../TargetsPage/TargetsPage';
// --- Icônes SVG pour le Menu (Lucide React - simplifiées) ---

// Dashboard
const HomeIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
);
// Missions
const ListIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3m0 2v2m0-2h4M9 15h2m-2 4h2m-4-4v2m4-2v2m-6-4h2m-2 4h2"/></svg>
);
// Targets
const TargetIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-2.239 3-5s-1.343-5-3-5-3 2.239-3 5 1.343 5 3 5z"/></svg>
);
// Agent Profile
const UserIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
);
// Equipment
const ToolIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
);
// Log Out
const LogOutIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
);
// Location
const LocationIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
);
// CheckIcon (Stat Card)
const CheckIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
);
// GraphIcon (Stat Card)
const GraphIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3 3 6-6m-6-4h4v4m0 0l-4 4"/></svg>
);
// WarningIcon (Stat Card)
const WarningIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z"/></svg>
);
// StarIcon (Stat Card)
const StarIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.97 2.887a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.887a1 1 0 00-1.176 0l-3.97 2.887c-.785.57-1.84-.197-1.54-1.118l1.519-4.674a1 1 0 00-.364-1.118L2.012 9.091c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"/></svg>
);
// Logo principal (simplifié)
const LogoIcon = (props) => (
    <div {...props} style={{ width: '28px', height: '28px', backgroundColor: 'var(--color-red-main)', borderRadius: '50%'}}></div>
);

// --- Données Mock ---
const STATS_DATA = [
    { title: 'Completed Missions', value: '47', icon: CheckIcon, color: 'var(--color-green)' },
    { title: 'Targets Neutralized', value: '1,289', icon: TargetIcon, color: 'var(--color-red-main)' },
    { title: 'Active Threats', value: '4', icon: WarningIcon, color: 'var(--color-yellow)' },
    { title: 'Agent Rating', value: 'A+', icon: StarIcon, color: 'var(--color-blue)' },
];

const MISSIONS_DASHBOARD_PREVIEW = [
    { target: 'Victor Novikov', status: 'Active', location: 'Paris, France', priority: 'High', reward: '750,000 USD', eta: '48h', id: 'M-7842' },
    { target: 'Silvio Caruso', status: 'Pending', location: 'Sapienza, Italy', priority: 'Medium', reward: '500,000 USD', eta: '72h', id: 'M-6391' },
    { target: 'Jordan Cross', status: 'Active', location: 'Bangkok, Thailand', priority: 'Critical', reward: '1,200,000 USD', eta: '24h', id: 'M-9103' },
];

const ACTIVITIES_DATA = [
    { id: 1, type: 'Target Neutralized', description: 'Subject A-4 successfully neutralized.', date: '2025-09-28', status: 'Completed' },
    { id: 2, type: 'Data Retrieval', description: 'Encrypted files extracted from Server X.', date: '2025-09-28', status: 'Completed' },
    { id: 3, type: 'Equipment Deploy', description: 'Stealth drone deployed in Sector 7.', date: '2025-09-27', status: 'Pending' },
    { id: 4, type: 'Mission Update', description: 'Operation Phoenix ETA updated.', date: '2025-09-27', status: 'Completed' },
];

// --- Composant principal ---
const DashboardPage = () => {
    // État pour gérer la page actuelle : 'Dashboard', 'Missions', 'Targets', etc.
    const [currentPage, setCurrentPage] = useState('Dashboard');

    const handleNavigation = (pageName) => {
        setCurrentPage(pageName);
        // Reset la position de scroll lors du changement de page
        document.querySelector(`.${styles.mainContent}`).scrollTop = 0;
    };

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <GlassStatsCard>
            <div className={styles.statHeader}>
                <h3 className={styles.title}>{title}</h3>
                <Icon className={styles.statIcon} style={{ color: color }} />
            </div>
            <div className={styles.value}>{value}</div>
        </GlassStatsCard>
    );

    const MissionCard = ({ mission }) => {
        const priorityClass = 
            mission.priority === 'High' || mission.priority === 'Critical' ? styles.priorityHigh :
            mission.priority === 'Medium' ? styles.priorityMedium : '';

        return (
            <GlassStatsCard>
                <div className={styles.missionCardLayout}>
                    <div className={styles.missionContent}>
                        <div className={styles.missionCardHeader}>
                            <h4 className={styles.targetName}>{mission.target}</h4>
                            <span className={mission.status === 'Active' ? styles.active : styles.pending}>
                                {mission.status}
                            </span>
                        </div>
                        
                        <p className={styles.location}>
                            <LocationIcon className={styles.navIcon} style={{width: '18px', height: '18px', color: 'var(--color-text-medium)'}}/> 
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
                        <button className={`${styles.actionButton} ${styles.detailsButton}`}>Details</button>
                        <button className={`${styles.actionButton} ${styles.acceptButton}`}>Accept</button>
                    </div>
                </div>
            </GlassStatsCard>
        );
    };

    const renderSidebar = () => (
        <div className={styles.sidebar}>
            <div>
                <div className={styles.logo}>
                    <LogoIcon className={styles.logoIcon}/>PHANTOM
                </div>
                <nav className={styles.navMenu}>
                    {/* Liens de navigation */}
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('Dashboard')}
                        className={`${styles.navItem} ${currentPage === 'Dashboard' ? styles.navItemActive : ''}`}
                    >
                        <HomeIcon className={styles.navIcon}/>Dashboard
                    </a>
                    
                    {/* 🔑 Lien vers la page Missions */}
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('Missions')}
                        className={`${styles.navItem} ${currentPage === 'Missions' ? styles.navItemActive : ''}`}
                    >
                        <ListIcon className={styles.navIcon}/>Missions
                    </a>
                    
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('Targets')}
                        className={`${styles.navItem} ${currentPage === 'Targets' ? styles.navItemActive : ''}`}
                    >
                        <TargetIcon className={styles.navIcon}/>Targets
                    </a>
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('Profile')}
                        className={`${styles.navItem} ${currentPage === 'Profile' ? styles.navItemActive : ''}`}
                    >
                        <UserIcon className={styles.navIcon}/>Agent Profile
                    </a>
                    <a 
                        href="#" 
                        onClick={() => handleNavigation('Equipment')}
                        className={`${styles.navItem} ${currentPage === 'Equipment' ? styles.navItemActive : ''}`}
                    >
                        <ToolIcon className={styles.navIcon}/>Equipment
                    </a>
                </nav>
            </div>
            {/* Bouton Logout */}
            <a href="#" className={styles.logoutButton}>
                <LogOutIcon className={styles.navIcon}/>Log Out
            </a>
        </div>
    );

    const renderActivitiesTable = () => (
        <div className={styles.activitiesSection}>
            <h2 className={styles.sectionTitle}>Recent Activities</h2>
            <table className={styles.activityTable}>
                <thead className={styles.tableHeader}>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ACTIVITIES_DATA.map(activity => (
                        <tr key={activity.id} className={styles.tableRow}>
                            <td>{activity.id}</td>
                            <td>{activity.type}</td>
                            <td>{activity.description}</td>
                            <td>{activity.date}</td>
                            <td className={activity.status === 'Completed' ? styles.statusCompleted : ''}>
                                {activity.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderDashboardContent = () => (
        <>
            <div className={styles.header}>
                <h1 className={styles.welcomeText}>Welcome Back, Agent 47.</h1>
                <p className={styles.briefing}>Your current operational status is Green. Review the briefing below.</p>
            </div>

            <div className={styles.statsGrid}>
                {STATS_DATA.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
            
            <div className={styles.missionsHeader}>
                <h2 className={styles.sectionTitle}>Active Missions</h2>
                <button className={styles.viewAllButton} onClick={() => handleNavigation('Missions')}>View All</button>
            </div>
            
            <div className={styles.missionsGrid}>
                {MISSIONS_DASHBOARD_PREVIEW.map((mission, index) => (
                    <MissionCard key={index} mission={mission} />
                ))}
            </div>

            {renderActivitiesTable()}
        </>
    );

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return renderDashboardContent();
            case 'Missions':
                // 🔑 Affiche le composant de la page Mission séparée
                return <MissionBoardPage />;
            // Ajoutez d'autres pages ici si nécessaire
            case 'Targets': 
                return <TargetsPage />; 
            case 'Profile':
                return <AgentProfile />;
            case 'Equipment':
                return <EquipmentPage />;
            default:
                return <h1 className={styles.welcomeText}>Page Not Found</h1>;
        }
    }


    return (
        <div className={styles.dashboardContainer}>
            {renderSidebar()}
            
            <div className={styles.mainContent}>
                {renderPage()}
            </div>
        </div>
    );
};

export default DashboardPage;
