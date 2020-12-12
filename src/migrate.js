import connection from './dbconnection';

connection.query(`
    CREATE TABLE library (
        id SERIAL PRIMARY KEY NOT NULL,
        Title TEXT NOT NULL,
        Author TEXT NOT NULL,
        Description TEXT NOT NULL
    );

`, (err, rows) => {
    if (err) throw err;
    console.log('Tables created successfully');
});


