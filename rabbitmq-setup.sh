#COMPOSER SCRIPT
#ONLY TO BE RUN ON UBUNTU-SERVER TO INSTALL AND INITIALIZE RABBITMQ
sudo apt update
sudo apt install -y rabbitmq-server

echo "listeners.tcp.default = 7007" | sudo tee -a /etc/rabbitmq.conf

sudo systemctl restart rabbitmq-server

sudo rabbitmqctl status

#PRIOR TO RUNNING, RUN THE FOLLOWING IN THE TERMINAL "chmod +x rabbitmq-setup.sh"
