import React from 'react'

function Todo({ 
    id, 
    title, 
    completed, 
    onRemove, 
    onToggleComplete, 
    onStartEdit, 
    onFinishEdit, 
    onCancelEdit, 
    isEditing, 
    editText, 
    onEditTextChange, 
}) {
    const handleRemove = () => {
        onRemove(id);
    };

    const handleToggle = () => {
        onToggleComplete(id);
    };

    const handleStartEdit = () => {
        onStartEdit({ id, title, completed });
    };

    const handleFinishEdit = () => {
        onFinishEdit(id);
    };

    const handleCancelEdit = () => {
        onCancelEdit();
    };

    const handleEditTextChange = (e) => {
        onEditTextChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleFinishEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <div className={`todo ${completed ? 'completed' : ''}`}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="edit-input"
                        value={editText}
                        onChange={handleEditTextChange}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <div className="edit-buttons">
                        <button className="save-btn" onClick={handleFinishEdit}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className="cancel-btn" onClick={handleCancelEdit}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <li className="todo-item" onDoubleClick={handleStartEdit}>
                        {title}
                    </li>
                    <div className="todo-buttons">
                        <button className="check-btn" onClick={handleToggle}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className="edit-btn" onClick={handleStartEdit}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="trash-btn" onClick={handleRemove}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Todo