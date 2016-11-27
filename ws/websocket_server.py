from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import time
import random

class Server(WebSocket):

    def handleMessage(self):
        self.sendMessage(todos[random.randint(0, len(todos)-1)])

    def handleConnected(self):
        print(self.address, "connected")
        clients.append(self)

    def handleClose(self):
        try:
            clients.remove(self)
            print(self.address, "closed")
        except:
            print("error")


def send_data(client):
    while True:
        print("hai")
        time.sleep(1)
        client.sendMessage(todos[random.randint(0, len(todos)-1)])

clients = []
todos = ['{"name": "PRPO kolokvij", "priority": 4}',
         '{"name": "SP kolokvij", "priority": 3}',
         '{"name": "UZ zagovor", "priority": 1}',
         '{"name": "PI naloga", "priority": 2}',
         '{"name": "PRPO naloga", "priority": 5}',
         '{"name": "SP kolokvij", "priority": 2}',
         '{"name": "OUI naloga", "priority": 4}']
server = SimpleWebSocketServer("", 8000, Server)
server.serveforever()
