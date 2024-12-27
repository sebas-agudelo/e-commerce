import React, { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import ResetPassword from '../components/auth_form/ResetPasswordForm';

const ResetPwd = () => {
    const { tokenHash } = useParams(); // Hämta path-parametrar    
    const [newPassword, setNewPassword] = useState();
    const nav = useNavigate()

    const handleConfirm = async () => {

        try {
            const response = await fetch(`http://localhost:3030/auth/resetpwd/${tokenHash}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tokenHash, password: newPassword})
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error)
            } else {
                alert(data.successfully)
                nav('/signin')
            }
        } catch (error) {
          
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleConfirm();

    }
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
