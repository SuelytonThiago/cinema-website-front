import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const SOCKET_URL = 'http://localhost:8080/ws';

let stompClient = null;

export const connect = (onMessageReceived) => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/comments', (message) => {
            onMessageReceived(JSON.parse(message.body));
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);
        // Tente reconectar após 5 segundos
        setTimeout(() => connect(onMessageReceived), 5000);
    });
};
