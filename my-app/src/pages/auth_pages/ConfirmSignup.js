import React, { useState } from 'react';
import { useParams  } from 'react-router-dom';

const ConfirmSignup = () => {
    const { tokenHash } = useParams(); // Hämta path-parametrar    

    const [isLoading, setIsLoading] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    const handleConfirm = async () => {
        if (!tokenHash) {
            setConfirmationStatus('No token or email provided');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3030/confirm/${tokenHash}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tokenHash})
            });

            const data = await response.json();

            if (response.ok) {
                setConfirmationStatus('Email successfully confirmed!');
         
            } else {
                setConfirmationStatus(data.error || 'Error confirming email');
            }
        } catch (error) {
            setConfirmationStatus('Error: ' + error.message);
        }

        setIsLoading(false);
    };

    return (
        <div style={{paddingTop: "55px"}}>
            <h2>Confirm your signup</h2>
            <button onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Confirm Email'}
            </button>
            {confirmationStatus && <p>{confirmationStatus}</p>}
        </div>
    );
};

export default ConfirmSignup;
