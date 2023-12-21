import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientList = ({ clients, onSelectClient }) => {

    return (
        <div className="client-list">
            <h2>Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.member_id} onClick={() => onSelectClient(client.member_id)}>
                   
                        {`${client.first_name} ${client.last_name}`}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default ClientList;
