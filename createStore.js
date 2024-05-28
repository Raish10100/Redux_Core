import { bindActionCreators, createStore } from 'redux';

const ADD_TODO = 'add_todo';
const DEL_TODO = 'delete_todo';
const UPD_TODO = 'edit_todo';

function todoReducer(state = [], action) {
    if (action.type === ADD_TODO) {
        const todoText = action.payload.todoText;
        return [
            ...state,
            { text: todoText, isFinished: false, id: (state.length === 0) ? 1 : state[state.length - 1].id + 1 }
        ];
    } else if (action.type === DEL_TODO) {
        const todoId = action.payload.todoId;
        return state.filter(t => t.id !== todoId);
    } else if (action.type === UPD_TODO) {
        const updatedTodo = action.payload.todo;
        const updatedText = action.payload.todoText;
        return state.map(t => {
            if (t.id === updatedTodo.id) {
                t.text = updatedText;
            }
            return t;
        });
    } else {
        return state;
    }
}

const { dispatch, subscribe, getState, replaceReducer } = createStore(todoReducer, []);

dispatch({ type: ADD_TODO, payload: { todoText: 'todo 1' } });
dispatch({ type: ADD_TODO, payload: { todoText: 'todo 2' } });
// console.log(getState());  // Expected output: [{ text: 'todo 1', isFinished: false, id: 1 }, { text: 'todo 2', isFinished: false, id: 2 }]


dispatch({ type: DEL_TODO, payload: { todoId: 1 } });
// console.log(getState()); // Expected output: [{ text: 'todo 2', isFinished: false, id: 2 }]



// converted action object -> action methods (action creator)
const addTodo = (todoText) => ({type: ADD_TODO, payload: {todoText}});
const  delTodo = (todoId) => ({type: DEL_TODO, payload: { todoId}});

dispatch(addTodo('todo 3'));
// console.log(getState()) ;  // Expected output: [{ text: 'todo 2', isFinished: false, id: 2 }, { text: 'todo 3', isFinished: false, id: 3 }]

dispatch(delTodo(2));
// console.log(getState()); // Expected output: [{ text: 'todo 3', isFinished: false, id: 3 }]


// using bindActionCreator 
const actions = bindActionCreators({addTodo, delTodo}, dispatch);
actions.addTodo('todo 4');
actions.delTodo(2);

console.log(getState())//  Expected output:  [{ text: 'todo 3', isFinished: false, id: 3 }, { text: 'todo 4', isFinished: false, id: 4 }]
