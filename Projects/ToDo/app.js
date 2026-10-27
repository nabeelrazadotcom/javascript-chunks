// ── STATE ──────────────────────────────────────────────
let todos  = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all'; // 'all' | 'active' | 'done'

// ── DOM REFS ───────────────────────────────────────────
const input      = document.getElementById('todo-input');
const addBtn     = document.getElementById('add-btn');
const todoList   = document.getElementById('todo-list');
const countEl    = document.getElementById('count');
const emptyState = document.getElementById('empty-state');
const clearBtn   = document.getElementById('clear-btn');
const filterIndicator = document.querySelector('.filter-indicator');

function updateFilterIndicator(btn) {
  const rect = btn.getBoundingClientRect();
  const parentRect = btn.parentElement.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  filterIndicator.style.width = `${rect.width}px`;
  filterIndicator.style.left = `${left}px`;
}

// Update indicator on load (active button)
const activeBtn = document.querySelector('.filter-btn.active');
if (activeBtn) updateFilterIndicator(activeBtn);


// ── SAVE TO LOCALSTORAGE ───────────────────────────────
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ── RENDER ─────────────────────────────────────────────
function render() {
  todoList.innerHTML = '';

  const visible = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return  t.done;
    return true;
  });

  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (t.done ? ' done' : '');
    li.dataset.id = t.id;

    li.innerHTML = `
      <button class="check-btn" title="Toggle complete">
        <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
      </button>

      <span>${t.text}</span>

      <div class="actions">
        <button class="btn-edit" title="Edit">
          <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-delete" title="Delete">
          <svg viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/><path d="M10,11v6"/><path d="M14,11v6"/><path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>
        </button>
      </div>
    `;

    // wire up buttons
    li.querySelector('.check-btn').addEventListener('click', () => toggleDone(t.id));
    li.querySelector('.btn-edit').addEventListener('click', () => startEdit(li, t.id));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTodo(li, t.id));

    todoList.appendChild(li);
  });

  // empty state
  emptyState.classList.toggle('hidden', visible.length > 0);

  // count
  const remaining = todos.filter(t => !t.done).length;
  countEl.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}

// ── ADD ────────────────────────────────────────────────
function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, done: false });
  save();
  render();

  input.value = '';
  input.focus();
}

// ── TOGGLE DONE ────────────────────────────────────────
function toggleDone(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  save();
  render();
}

// ── DELETE ─────────────────────────────────────────────
function deleteTodo(li, id) {
  // creepy box animation before removal
  li.classList.add('creepy');

  li.addEventListener('animationend', () => {
    // after creepy animation, actually remove the item
    todos = todos.filter(t => t.id !== id);
    save();
    render();
  }, { once: true });
}

// ── INLINE EDIT ────────────────────────────────────────
function startEdit(li, id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const span     = li.querySelector('span');
  const editBtn  = li.querySelector('.btn-edit');
  const actions  = li.querySelector('.actions');

  // swap span → input
  const editInput = document.createElement('input');
  editInput.className = 'edit-input';
  editInput.type  = 'text';
  editInput.value = todo.text;
  li.classList.add('editing');
  span.replaceWith(editInput);
  editInput.focus();
  editInput.select();

  // swap Edit btn → Save btn
  editBtn.className = 'btn-save';
  editBtn.title     = 'Save';
  editBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20,6 9,17 4,12"/></svg>`;

  function save() {
    const newText = editInput.value.trim();
    if (newText) todo.text = newText;
    saveGlobal();
    render();
  }

  editBtn.addEventListener('click', save, { once: true });
  editInput.addEventListener('keydown', e => {
    if (e.key === 'Enter')  save();
    if (e.key === 'Escape') render(); // cancel
  });
}

// ── FILTER ─────────────────────────────────────────────
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.f;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── CLEAR COMPLETED ────────────────────────────────────
clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  save();
  render();
});

// ── EVENT LISTENERS ────────────────────────────────────
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

// ── alias so inner save() can call outer save() ────────
function saveGlobal() { save(); }

// ── INIT ───────────────────────────────────────────────
render();
