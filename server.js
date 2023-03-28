const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url === '/users') {
        res.write(JSON.stringify({ message: 'Hello Users' }));
    }
    else{
        res.write(JSON.stringify({ message: 'Hello World' }));
    }
}).listen(4001, () => console.log('servidor rodando na porta 4001'));