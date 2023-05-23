const { addNoteHandler, getNoteHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        // handle CORS using hapi (one route scope only)
        // options: {
        //     cors: {
        //         origin: ['*'],
        //     }
        // }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getNoteHandler,
    }, 
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    }, 
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
];

module.exports = routes;