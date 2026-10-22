
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');

        const db = client.db('JMInteriorDB');
        const projects = db.collection('Projects');

        // Insert three interior design projects
        await projects.insertMany([
            {
                name: 'Modern Living Room',
                style: 'Modern',
                budget: 150000
            },
            {
                name: 'Luxury Bedroom',
                style: 'Luxury',
                budget: 200000
            },
            {
                name: 'Minimalist Office',
                style: 'Minimalist',
                budget: 100000
            }
        ]);

        console.log('Three projects inserted');

        // Display all projects
        const allProjects = await projects.find({}).toArray();
        console.log('All Projects:', allProjects);

        // Display modern design projects
        const modernProjects = await projects.find({
            style: 'Modern'
        }).toArray();

        console.log('Modern Projects:', modernProjects);

        // Update a project's budget
        const updateResult = await projects.updateOne(
            { name: 'Modern Living Room' },
            { $set: { budget: 175000 } }
        );

        console.log('Updated projects:', updateResult.modifiedCount);

        // Delete a project
        const deleteResult = await projects.deleteOne({
            name: 'Minimalist Office'
        });

        console.log('Deleted projects:', deleteResult.deletedCount);

    } catch (error) {
        console.error('Database error:', error.message);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();
