This program consist of two parts of implementing RabbitMQ
#1. RabbitMQ Server implementation
#2. Message Qeue, Publisher and Subscriber implementation

There are two methods used to demonstrate the event driven pattern
#1. Order Sample : This sample indicates a single Publisher for order-creation & it is reads by the Subscriber and procedss the received message
#2. CRM Sample : This sample indicates a single Publisher event is consumed by multiple services and process separate concerns


Starting RabbitMQ Server
|
--- npm run dev

Test the POST request for Order Creation
|
--- http:/localhost:3000/create


Run the CRM Service and Other Services Separately
|
--- npm run crm
|
--- npm run contact
|
--- npm run address
|
--- npm run business

