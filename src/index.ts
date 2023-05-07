import server from './server';

const PORT = process.env.API_PORT || 8888;

server.listen(PORT, () => console.log(`here : http://localhost:${PORT}`));
