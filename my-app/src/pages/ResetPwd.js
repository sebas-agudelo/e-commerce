import React, { useState } from 'react';
import { useParams  } from 'react-router-dom';

const ResetPwd = () => {
    const { tokenHash } = useParams(); // Hämta path-parametrar    

    const [isLoading, setIsLoading] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [newPassword, setNewPassword] = useState();

    const handleConfirm = async () => {
        if (!tokenHash) {
            setConfirmationStatus('No token or email provided');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3030/auth/resetpwd/${tokenHash}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tokenHash, password: newPassword})
            });

            const data = await response.json();

            if (response.ok) {
                setConfirmationStatus(data.successfully);
            } else {
                setConfirmationStatus(data.error);
            }
        } catch (error) {
            setConfirmationStatus('Error: ' + error.message);
        }

        setIsLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfirm();

    }
    return (
        <div>
       <form onSubmit={handleSubmit}>
            <input type='text'
            onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type='submit'>Send</button>
       </form>
            {confirmationStatus && <p>{confirmationStatus}</p>}
        </div>
    );
};

export default ResetPwd;
