import admin from 'firebase-admin';
import serviceAccount from './secrets/fitfam-be65f-firebase-adminsdk-ypvk9-bbdf88d062.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fitfam-be65f-default-rtdb.firebaseio.com'
});

const db = admin.database();

// Define initial data
const initialData ={
    "attendance": {
      "userId2": {
        "2023-11-29": true,
        "2023-11-30": true
      },
      "userId2": {
        "2023-11-29": false,
        "2023-11-30": true
      }
      // ... other users
    },
    "trainers": {
      "trainerId1": {
        "name": "John Doe",
        "specialty": "Cardio",
        "bio": "A brief bio of the trainer",
        "photoUrl": "url-to-photo"
      },
      // ... other trainers
    },
    "trainerSchedule": {
      "trainerId1": {
        "2023-11-29": [
          {
            "startTime": "08:00",
            "endTime": "10:00",
            "userId": "userId1"
          }
        ]
      },
      // ... schedules for other trainers
    },
    "equipment": {
      "equipmentId1": {
        "name": "Treadmill",
        "status": "available",
        "maintenanceSchedule": "2023-12-01"
      },
      // ... other equipment
    },
    "admins": {
      "adminId1": {
        "name": "Jane Smith",
        "email": "jane.smith@example.com"
      },
      // ... other admins
    },
    "gymUsers": {
      "userId1": {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "membershipLevel": "Gold",
        "caloriesBurned": 0 // This can be updated as the user exercises
      },
      // ... other gym users
    },
    "competitions": {
      "competitionId1": {
        "name": "Holiday Burnoff",
        "startDate": "2023-12-01",
        "endDate": "2023-12-31",
        "participants": {
          "userId1": {
            "caloriesBurned": 0
          },
          // ... other participants
        }
      }
      // ... other competitions
    }
  }
  ;

// Write the initial data to the database
db.ref().set(initialData, (error) => {
  if (error) {
    console.log('Data could not be saved.' + error);
  } else {
    console.log('Data saved successfully.');
  }
});
