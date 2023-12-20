import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientList = ({ clients }) => {
    const navigate = useNavigate();

    const handleSelectClient = memberId => {
        navigate(`/client-profile/${memberId}`);
    };

    return (
        <div className="client-list">
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.member_id} onClick={() => handleSelectClient(client.member_id)}>
                        {client.first_name} {client.last_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientList;
