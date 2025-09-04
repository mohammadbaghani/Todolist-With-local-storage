import React, { useEffect, useState } from 'react'
import Header from './Header'
import Todo from './Todo'
import './TodoList.css';

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState("")
    const [status, setStatus] = useState("all")
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState("")
    

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('mohammad')) || []
        setTodos(storedTodos)
    }, [])

  
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

  
    useEffect(() => {
        localStorage.setItem('mohammad', JSON.stringify(todos))
    }, [todos])

    const todoTitleHandler = (event) => {
        setTodoTitle(event.target.value)
    }
    
    const addTodo = (event) => {
        event.preventDefault()
        if (!todoTitle.trim()){
            alert("فیلد خالی است دوست عزیز !")
            return
        } 
        
        let newTodoObject = {
            id: Date.now(), 
                     title: todoTitle,
            completed: false
        }

        setTodos(prevState => {
            return [...prevState, newTodoObject]
        })
        setTodoTitle('')
    }
    
    const removeTodo = (todoId) => {
        let newTodos = todos.filter(todo => {
            return todo.id !== todoId
        })
        setTodos(newTodos)
    }

    const toggleComplete = (todoId) => {
        let newTodos = todos.map(todo => {
            if (todo.id === todoId) {
                return {...todo, completed: !todo.completed}
            }
            return todo
        })
        setTodos(newTodos)
    }
    
    const statusHandler = (event) => {
        setStatus(event.target.value)
    }


    const startEdit = (todo) => {
        setEditingId(todo.id)
        setEditText(todo.title)
    }


    const finishEdit = (todoId) => {
        if (editText.trim()) {
            let newTodos = todos.map(todo => {
                if (todo.id === todoId) {
                    return {...todo, title: editText}
                }
                return todo
            })
            setTodos(newTodos)
        }
        setEditingId(null)
        setEditText("")
    }


    const cancelEdit = () => {
        setEditingId(null)
        setEditText("")
    }


    const completedTodos = todos.filter(todo => todo.completed).length
    const remainingTodos = todos.length - completedTodos
    
    return (
        <div className="todo-app">
            <Header />
            
            <div className="todo-stats">
                <div className="stat-item">
                    <span className="stat-number">{todos.length}</span>
                    <span className="stat-label">کل تسک‌ها</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{completedTodos}</span>
                    <span className="stat-label">تکمیل شده</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{remainingTodos}</span>
                    <span className="stat-label">مانده</span>
                </div>
            </div>
            
            <form onSubmit={addTodo} className="todo-form">
                <div className="input-container">
                    <input 
                        type="text" 
                        className="todo-input" 
                        maxLength="40" 
                        value={todoTitle} 
                        onChange={todoTitleHandler} 
                        placeholder="اینجا تایپ کنید..." 
                        dir="rtl"
                    />
                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                        {!isMobile && <span className='add-text'>افزودن</span>}
                    </button>
                </div>
                <div className="select-container">
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={statusHandler} dir="rtl">
                            <option value="all">همه</option>
                            <option value="completed">تکمیل شده</option>
                            <option value="uncompleted">تکمیل نشده</option>
                        </select>
                    </div>
                </div>
            </form>
            
            <div className="todo-container">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-clipboard-list"></i>
                        <p>هیچ تسکی وجود ندارد</p>
                    </div>
                ) : (
                    <ul className="todo-list">
                        {status === 'completed' && todos.filter(todo => todo.completed).map(todo => (
                            <Todo 
                                key={todo.id} 
                                {...todo} 
                                onRemove={removeTodo} 
                                onToggleComplete={toggleComplete}
                                onStartEdit={startEdit}
                                onFinishEdit={finishEdit}
                                onCancelEdit={cancelEdit}
                                isEditing={editingId === todo.id}
                                editText={editText}
                                onEditTextChange={setEditText}
                                isMobile={isMobile} 
                            />))}

                        {status === 'uncompleted' && todos.filter(todo => !todo.completed).map(todo => (
                            <Todo 
                                key={todo.id} 
                                {...todo} 
                                onRemove={removeTodo} 
                                onToggleComplete={toggleComplete}
                                onStartEdit={startEdit}
                                onFinishEdit={finishEdit}
                                onCancelEdit={cancelEdit}
                                isEditing={editingId === todo.id}
                                editText={editText}
                                onEditTextChange={setEditText}
                                isMobile={isMobile} 
                            />))}

                        {status === "all" && todos.map(todo => (
                            <Todo 
                                key={todo.id} 
                                {...todo} 
                                onRemove={removeTodo} 
                                onToggleComplete={toggleComplete}
                                onStartEdit={startEdit}
                                onFinishEdit={finishEdit}
                                onCancelEdit={cancelEdit}
                                isEditing={editingId === todo.id}
                                editText={editText}
                                onEditTextChange={setEditText}
                                isMobile={isMobile} 
                            />))
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}