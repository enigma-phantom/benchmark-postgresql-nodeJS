const { Client } = require('pg');

// Konfigurasi koneksi ke database PostgreSQL
const client = new Client({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: '',
    port: 5432, // Port default PostgreSQL
});

async function runBenchmark() {
    try {
        await client.connect();

        // Fungsi untuk melakukan operasi benchmark (misalnya SELECT)
        async function performBenchmark() {
            // Implementasi operasi benchmark di sini
            const query = 'SELECT * FROM your_table';
            const startTime = Date.now();
            const result = await client.query(query);
            const endTime = Date.now();
            const rowCount = result.rows.length;
            console.log('Total waktu yang diperlukan:', endTime - startTime, 'milidetik');
            console.log('Jumlah data yang diambil:', rowCount);
        }

        // Menjalankan benchmark
        await performBenchmark();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.end();
    }
}

// Jalankan benchmark
runBenchmark();
