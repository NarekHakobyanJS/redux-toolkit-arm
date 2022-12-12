// createSlice - reducer ի մասերի համակենտրոնացվող ֆունկցիա
//createAsyncThunk - թույլա տալիս աշխատել անսինխռոն կոդի հետ
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk - Ֆունկցիայ է որը ընդունում է երկու արգումենտ
// 1․ name - Հարկավոր նրա համար որպեսզի մեր action ը ստեղծի action ի type ը մեր օրինակում անունը սա է  'todos/fetchTodos'
//2. 2 րդ արգումենտը ստանում է այն ինչի հետ պետք է աշխատենք Մեր դեպքում դա անսինխռոն ֆունկցիայ է
// այդ Ֆունկցիան ստանում է 3 արգումենտ 
//1, այն ինֆորմացիան է որը փախանցում ենք dispatch ի ժամանակ եթե dispatch ը չի ընդունում արգումենտ կարողենք գրել այսպես =>  _,
//2, պարամետր ստանում ենք Օբյեկտ  մեր դեպքում  այդ օբյեկտից վերցնում ենք այս բանալին rejectWithValue որը սխալի ժամանակ պետք է վերադարձնենք 

// fetchTodos import ենք անելու App
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
        try {

            const response = await fetch('https://jsonplaceholder.typicode.com/todos');

            if (!response.ok) {
                throw new Error('Server Errror')
            }
            const data = await response.json()
            // data վերադրաձնում ենք մեր ֆունկցիայի մեջից
            // data վերադրաձնում ենք և ինչ որ action պետք է լինի և Reducerները պետքէ փոխեն state ը
            // fetchTodos - մեզ տրամադրում է 3 life cycle որը կարողենք օգտագործ ել
            // բացյ այդ մեթոդները օգտագործում ենք ոչ թե reducers ում այլ createSlice ում ստեղծում ենք առանձին բանալի որի 
            // անունը extraReducers ա որը նույնպես վերադարձնում է օբյեկտ
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('sory error')
            }

            dispatch(removeTodo({id}))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
//createSlice - ֆունկցիա է որը վերադարձնում է Օբյեկտ 
// որը ունի 3 դաշտ 
// 1․ name - դաշտում մենք գրում ենք մեր Slice ի անունը որը հտագայում պետք է redux toolkit ին որպիսզի այն այդ անունով ստեղծի action
//2. initialState - Մեր Slice ի նախնական արժեքը
//3․ reducers - reducers ին փոխանցում ենք Օբյեկտ որի մեջ գտնվում է մեր reducer - ները
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                complited: false
            })
        },
        toggleTodoComplited(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.complited = !toggledTodo.complited
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        }
    },
    extraReducers: {
        // օգտագործում ենք դինամիկ բանալի [] մեջ գրումենք մեր ֆունկցիայի անունը fetchTodos 
        // այն ունի 3 կատարման ձև 
        // 1. pending - երբ ծրագիրը բեռնվում է 
        //2. fulfilled - երբ բարեհաջող ստացվել է պատասխանը
        //3, rejected - երբ տեղի է ունեցել սխալ 
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.paylaod;
        },
        [deleteTodo.rejected] : (state, action) => {
            state.status = 'rejected';
            state.error = action.paylaod;
        }
    },
})

//այս ֆայլից դեպի դուրս export ենք անում մի քանի ֆայլ
// 1 export ենք անում action երը որը վերձնում ենք մեր Slice ից գրելով Slice ի անունը և նրա մեջ ներկառուցված ֆունկցիան actions
// 2. export ենք անում հենց reducer ը որը միացնում է մեր Slice reducer ները որը միանում է մեկ անունի մեջ reducer

export const { addTodo, toggleTodoComplited, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;