import React from 'react';
import styles from './GlassStatsCard.module.css';

/**
 * Composant de carte réutilisable pour les statistiques ou les missions,
 * appliquant le style Glassmorphism.
 * * @param {object} props
 * @param {React.ReactNode} props.children - Le contenu à afficher dans la carte.
 * @param {string} [props.className] - Classes CSS externes pour la mise en page (ex: largeur).
 */
const GlassStatsCard = ({ children, className }) => {
  // Utilisation de la classe de base définie dans le module CSS
  const finalClasses = `${styles.card} ${className || ''}`;

  return (
    <div className={finalClasses}>
      {children}
    </div>
  );
};

export default GlassStatsCard;
