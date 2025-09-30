import React from 'react';
// Importation du module CSS local pour encapsuler les styles
import styles from './GlassCard.module.css'; 

/**
 * Composant GlassCard (Conversion CSS Pur)
 * Un conteneur réutilisable avec un effet de glassmorphism stylé en CSS pur.
 * * Note: La prop 'className' de l'original est renommée en 'externalClasses' 
 * pour clarifier qu'elle est destinée à des styles de mise en page (largeur, marge, flex).
 * * @param {object} props
 * @param {React.ReactNode} props.children - Le contenu à afficher à l'intérieur de la carte.
 * @param {string} [props.externalClasses] - Classes CSS additionnelles passées de l'extérieur pour le layout.
 */
const GlassCard = ({ children, externalClasses }) => {
  
  // Combinaison de la classe de base du Glassmorphism (styles.card) 
  // et des classes de mise en page externes (externalClasses).
  const finalClasses = `${styles.card} ${externalClasses || ''}`;

  return (
    // Utilisation de la classe combinée
    <div className={finalClasses}>
      {children}
    </div>
  );
};

export default GlassCard;
