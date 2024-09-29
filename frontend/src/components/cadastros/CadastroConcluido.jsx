import React, { useState, useEffect } from 'react';
import styles from './Cadastros.module.css';

function CadastroConcluido({ onClose }) {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer); // Limpa o timer para evitar múltiplos intervalos.
        } else {
            onClose(); // Chama a função onClose quando o contador chega a 0.
        }
    }, [countdown, onClose]);

    return (
        <div className="cadastro-concluido">
            <h2>Cadastro Concluído!</h2>
            <p>Fechando em {countdown} segundos...</p>
        </div>
    );
}

export default CadastroConcluido;

