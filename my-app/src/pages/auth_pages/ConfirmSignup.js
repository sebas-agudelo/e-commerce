import React, { useState } from 'react';
import { useParams  } from 'react-router-dom';

const ConfirmSignup = () => {
    const { tokenHash } = useParams(); 
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    const handleConfirm = async () => {
    
        try {
            const response = await fetch(``, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tokenHash})
            });

            const data = await response.json();

            if (response.ok) {
                setConfirmationStatus('E-post bekräftad framgångsrikt');
         
            } else {
                setConfirmationStatus(data.error || 'Error confirming email');
            }
        } catch (error) {
            setConfirmationStatus('Error: ' + error.message);
        }
    };

    return (
        <div style={{paddingTop: "500px"}}>
            <h2>Confirm your signup</h2>
            <button onClick={handleConfirm}>
                mckcmksksksksk
            </button>
          
        </div>
    );
};

export default ConfirmSignup;
