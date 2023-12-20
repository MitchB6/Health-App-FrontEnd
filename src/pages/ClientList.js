// import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientList = ({ clients}) => {
    const navigate = useNavigate();

    const handleSelectClient = clientId => {
        navigate(`/client-profile/${clientId}`);
    };

    return (
        <div className="client-list">
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id} onClick={() => handleSelectClient(client.id)}>
                        {client.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientList;
