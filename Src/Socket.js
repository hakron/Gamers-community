import axios from 'axios';
import * as io from 'socket.io-client';

let socket;
var rooms = ["Main Room"];

const getSocket = () => {
    if (socket) {
        return socket;
    } else {
        socket = io.connect();
        socket.on('connect', function() {
            axios.get(`/connected/${socket.id}`);
            socket.emit("Main Room", rooms);
        });
        return socket;
    }
};

export default getSocket;
