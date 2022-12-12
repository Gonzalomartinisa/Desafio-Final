import note from "../src/models/users.js"

export default (io) => {
    io.on('connection', () =>{
       const emitNotes = async () => {
        const notes = await note.find()
        io.emit('loadnotes', notes)
       }
       emitNotes()
    })
};



