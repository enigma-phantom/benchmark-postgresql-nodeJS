const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Konfigurasi koneksi ke database PostgreSQL
const client = new Client({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: '',
    port: 5432, // Port default PostgreSQL
});

// Middleware untuk menghubungkan ke database sebelum menangani request
app.use(async (req, res, next) => {
    try {
        await client.connect();
        next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint untuk melakukan benchmark
app.get('/benchmark', async (req, res) => {
    try {
        // Fungsi untuk melakukan operasi benchmark (misalnya SELECT)
        async function performBenchmark() {
            // Implementasi operasi benchmark di sini
            const query = 'SELECT * FROM your_table';
            const startTime = Date.now();
            const result = await client.query(query);
            const endTime = Date.now();
            const rowCount = result.rows.length; // Menghitung jumlah baris yang dikembalikan
            return {
                totalTime: endTime - startTime,
                rowCount: rowCount
            };
        }

        // Menjalankan benchmark
        const benchmarkResult = await performBenchmark();
        res.json(benchmarkResult);
    } catch (error) {
        console.error('Error during benchmark:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Menghentikan koneksi database saat server ditutup
process.on('SIGINT', async () => {
    await client.end();
    process.exit();
});

// Mulai server Express
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
