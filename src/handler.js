const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Note Created!',
            data: {
                noteId: id,
            }
        });
        // response.header('Access-Control-Allow-Origin', '*');
        response.code(201);
        return response;
    }

    const failed = h.response({
        status: 'fail',
        message: 'Failed creating Note',
    });
    response.code(500);
    return failed;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((v) => v.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title, 
            tags,
            body,
            updatedAt
        }


        const response = h.response({
            status: 'success',
            message: 'Note Updated!',
            data: {
                noteId: id,
            }
        });
        // response.header('Access-Control-Allow-Origin', '*');
        response.code(200);
        return response;
    }

    const failed = h.response({
        status: 'fail',
        message: 'Failed Updating Note',
    });
    response.code(500);
    return failed;
}

const getNoteHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((res) => res.id === id)[0];

    if (note !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                note,
            }
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'Note is not found',
    });

    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((v) => v.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        
        const response = h.response({
            status: 'success',
            message: 'Note deleted',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'Delete Failed',
    });

    response.code(404);
    return response;
};

module.exports = { 
    addNoteHandler, 
    getNoteHandler, 
    getNoteByIdHandler,
    editNoteByIdHandler, 
    deleteNoteByIdHandler
};