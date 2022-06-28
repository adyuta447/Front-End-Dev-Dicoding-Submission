import React from "react";
import DeleteButton from "../atoms/DeleteButton";
import ArchiveButton from "../atoms/ArchiveButton";
import NoteItemBody from "../atoms/NoteItemBody";

function NoteItem({ note, deleteNote, archiveNote }) {
    return (
        <div className="note__item">
            <NoteItemBody title={note.title} createdAt={note.createdAt} body={note.body} />
            <div className="note__item-actions">
                <DeleteButton onClick={() => deleteNote(note.id)} />
                <ArchiveButton archived={note.archived} onClick={() => archiveNote(note.id)} />
            </div>
        </div>
    );
}

export default NoteItem;