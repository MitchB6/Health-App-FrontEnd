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
            { date: '2023-12-01', caloriesIn: 2200, waterIntake: 64, emotionalWellness: '😃 Happy' },
            { date: '2023-12-02', caloriesIn: 2100, waterIntake: 70, emotionalWellness: '😐 Neutral' },
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
            { date: '2023-12-01', caloriesIn: 1900, waterIntake: 55, emotionalWellness: '😌 Relaxed' },
            { date: '2023-12-02', caloriesIn: 2000, waterIntake: 60, emotionalWellness: '😔 Sad' },
            // More log entries...
        ]
    },
];

export { clients, pendingRequests };
