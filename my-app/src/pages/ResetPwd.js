import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResetPassword from '../components/auth_form/ResetPasswordForm';

const ResetPwd = () => {
    const { tokenHash } = useParams(); // Hämta path-parametrar
    const [newPassword, setNewPassword] = useState();
    const nav = useNavigate();

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:3030/auth/resetpwd/${tokenHash}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword })  // Skicka bara password, inte tokenHash
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.verifyError);
            } else {
                alert(data.successfully);
                nav('/signin');  // Navigera till sign-in sidan efter lyckad återställning
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfirm();
    };

    return (
        <main>
            <ResetPassword 
                setNewPassword={setNewPassword}
                handleSubmit={handleSubmit}
            />
        </main>
    );
};

export default ResetPwd;
