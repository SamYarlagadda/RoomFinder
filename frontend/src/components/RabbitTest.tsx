import { useState, useEffect } from 'react';
import mqtt, { MqttClient } from 'mqtt';

type RabbitOptions = {
    username: string,
    password: string,
    keepalive: number
}

export const RabbitTest = () => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState('Connecting');

  const host = 'mqtt://ssy22:ssy22@localhost:1883';
  const mqttOption = {
    username: 'ssy22',
    password: 'ssy22',
    keepalive: 5000
  };

  useEffect(() => {
    const mqttConnect = (host:string, mqttOption: RabbitOptions) => {
      setClient(mqtt.connect(host, mqttOption));
    };

    mqttConnect(host, mqttOption);

    if (client) {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });

      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });

      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });

      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log(payload);
      });
    }
  }, []);

  const sendMessage = () => {
    if (client) {
      const message = 'Hello, MQTT!';
      client.publish('messages', message);
      console.log(" [x] Sent %s", message);
    }
  }

  return (
    <div>
      <h1>React Component with MQTT</h1>
      <h2>Status: {connectStatus}</h2>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
  
}
