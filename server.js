const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef =  protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage =  grpcObject.todoPackage;


const server =  new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service,
    {
        "createTodo": createTodo,
        "readTodos": readTodos
    });

server.start();

const todos = [];

function createTodo (call, callback) {

    console.log('Listen what we have: ',call) //Returns raw JSON

    const todoItem =  {
        "id": todos.length + 1, 
        "text": call.request.text //Fill a new item with req data
    }

    todos.push(todoItem); // Add new JSON to array of items
    callback(null, todoItem);
}

function readTodos (call, callback){
    callback(null, {"items": todos})
    //console.log('Check todos: ',todos) //Returns all todos stored
}