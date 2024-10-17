// src/components/ModalFeedback.js
import React from 'react';
import styles from './ModalFeedback.module.css'; // Estilos do modal

function ModalFeedback({ message, onClose }) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Feedback</h2>
                <p>{message}</p>
                <button className={styles.closeButton} onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default ModalFeedback;
