import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientList = ({ clients}) => {
    const navigate = useNavigate();

    const handleSelectClient = clientId => {
        navigate(`/client-profile/${clientId}`);
        console.log(clientId)
    };

    const handleChatWithClient = (client) => {
        navigate(`/chat`, { state: { recp: client } });
    };

    // const redirectToChat = (coach) => {
    //     console.log(coach.first_name)
    //     navigate('/chat', { state: { coach: coach } });
    //   };
    

    return (
        <div className="client-list">
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id} className="client-item">
                        <span className="client-name"></span>
                        <div className="client-actions">
                            <button onClick={() => handleSelectClient(client.id)} className="client-action-button">{client.name}</button>
                            <button onClick={() => handleChatWithClient(client)} className="client-action-button">Chat</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientList;

