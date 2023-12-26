interface ITodo {
    id: number;
    title: string
}

class NoteBook {
    private _todos: ITodo[]

    constructor(private name: string) {
        this._initMain()
    }

    private _getTodosFromLS(): void {
        this._todos = JSON.parse(localStorage.getItem(this.name)) || []
    }

    private _setTodosToLS(): void {
        localStorage.setItem(this.name, JSON.stringify(this._todos))
        this._initTodos()
    }

    private _initMain(): void {
        this._initForm()
        this._initTodos()
    }

    private _deleteTodo(id: number): void {
        this._todos = this._todos.filter(todo => todo.id !== id);
        this._setTodosToLS();
    }

    private _initTodos(): void {
        this._getTodosFromLS();
        const todosDiv = document.querySelector('#todos') as HTMLDivElement;
        todosDiv.innerHTML = '';

        this._todos.forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.innerText = `${todo.id}) ${todo.title}`;
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => this._deleteTodo(todo.id);
            todoDiv.appendChild(deleteButton);
            todosDiv.appendChild(todoDiv);
        });
    }

    private _initForm(): void {
        const form = document.forms['form'] as HTMLFormElement;
        form.onsubmit = (e) => {
            e.preventDefault()
            const input = e.target['title'] as HTMLInputElement;
            const id = this._todos.slice(-1)[0]?.id + 1 || 1;
            this._todos.push({id, title: input.value})
            this._setTodosToLS()
            form.reset()
        }
    }


}

new NoteBook('notebook3')