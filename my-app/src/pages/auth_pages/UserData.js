import React, { useContext, useEffect, useState } from 'react'
import { AuthSessionContext } from '../../Context/SessionProvider';

export default function UserData() {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        birthday: "",
        address: "",
        postal: "",
    })

    const {verifySession, setLoading} = useContext(AuthSessionContext);

    useEffect(() => {
        const fetch = async () => {
            await verifySession()
            setLoading(false)
        }

        fetch()
    }, [verifySession])


    const fetchInserUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3030/auth/register/information`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            });
      
            const data = await response.json();
      
            if (response.ok) {
             
                alert(data.success)
            } else {
              alert(data.error)
            }
          } catch (error) {
            console.error(error);
          }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchInserUserData()
    }

    return (
        <main className='user-data-container' >
            <section className='user-data-wrapper'>

            <article className="user-data-content">
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        name='firstname' 
                        value={userData.firstname} 
                        onChange={handleChange} 
                        placeholder='Förnamn' 
                    />
                    <input 
                        type='text' 
                        name='lastname' 
                        value={userData.lastname} 
                        onChange={handleChange} 
                        placeholder='Efternamn' 
                    />
                    <input 
                        type='text' 
                        name='phone' 
                        value={userData.phone} 
                        onChange={handleChange} 
                        placeholder='Telefonnummer' 
                    />
                    <input 
                        type='date' 
                        name='birthday' 
                        value={userData.birthday} 
                        onChange={handleChange} 
                        placeholder='Födelsedatum' 
                    />
                    <input 
                        type='text' 
                        name='address' 
                        value={userData.address} 
                        onChange={handleChange} 
                        placeholder='Adress' 
                    />
                    <input 
                        type='text' 
                        name='postal' 
                        value={userData.postal} 
                        onChange={handleChange} 
                        placeholder='Postnummer' 
                    />
                    <button type='submit'>Skicka</button>
                </form>
                </article>
            </section>
        </main>
    );
}
