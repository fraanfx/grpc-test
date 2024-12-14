const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef =  protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage =  grpcObject.todoPackage;


const text =  process.argv[2]; // promp a text

const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure()); // Create a insecure client

client.createTodo({
    "id": 2,
    "text": text //add prompted text
}, (err, response) => {
    console.log("Received from the server " + JSON.stringify(response))
})

client.readTodos({}, (err, response) => {
    console.log("Received from the server " + JSON.stringify(response))
});