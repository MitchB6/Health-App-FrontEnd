const clients = [
    { 
        id: 1, 
        name: 'John Doe', 
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        age: 30,
        gender: 'Male',
        location: 'Newark, NJ, 07101',
        stats: [
            { date: '2023-12-01', calories_intake: 2200, hydration_level: 10, mood_level: '5' },
            { date: '2023-12-02', calories_intake: 2100, hydration_level: 7, mood_level: '3' },
            // More log entries...
        ]
    },
    { 
        id: 1, 
        name: 'Mia Smith', 
        email: 'mia@example.com',
        phone: '123-456-7890',
        age: 20,
        gender: 'Fimail',
        location: 'Red Bank, NJ, 07101',
        stats: [
            { date: '2023-12-01', calories_intake: 1200, hydration_level: 10, mood_level: '5' },
            { date: '2023-12-02', calories_intake: 1500, hydration_level: 8, mood_level: '4' },
            // More log entries...
        ]
    },
]; 

const pendingRequests = [
    { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'janesmith@example.com',
        phone: '987-654-3210',
        age: 28,
        gender: 'Female',
        location: 'New York, NY, 10001',
        stats: [
            { date: '2023-12-01', calories_intake: 1900, hydration_level: 55, mood_level: '4' },
            { date: '2023-12-02', calories_intake: 2000, hydration_level: 60, mood_level: '2' },
            // More log entries...
        ]
    },
];

export { clients, pendingRequests };
