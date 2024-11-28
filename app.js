
// Firebase Configuration (Substitua pelos dados do seu projeto Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyB7GvJ2EaXY_jNgshXn2bSk3tPnBEYFPr8",
  authDomain: "home-kids-easy.firebaseapp.com",
  projectId: "home-kids-easy",
  storageBucket: "home-kids-easy.firebasestorage.app",
  messagingSenderId: "487079938225",
  appId: "1:487079938225:web:64912844c3781a0209ba90",
  measurementId: "G-XSF7ZNVEFM"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elementos da interface
const loginScreen = document.getElementById('login-screen');
const taskScreen = document.getElementById('task-screen');
const loginForm = document.getElementById('login-form');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameDisplay = document.getElementById('username');
const pointsDisplay = document.getElementById('points');
const taskList = document.getElementById('task-list');

// Função para alternar telas
function showScreen(screen) {
    loginScreen.style.display = screen === 'login' ? 'block' : 'none';
    taskScreen.style.display = screen === 'task' ? 'block' : 'none';
}

// Autenticação
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => showScreen('task'))
        .catch(err => alert(err.message));
});

registerBtn.addEventListener('click', () => {
    const email = prompt("Digite seu email:");
    const password = prompt("Digite sua senha:");
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Usuário registrado com sucesso!"))
        .catch(err => alert(err.message));
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => showScreen('login'));
});

// Monitorar usuário logado
auth.onAuthStateChanged(user => {
    if (user) {
        usernameDisplay.textContent = user.email.split('@')[0];
        showScreen('task');
        loadTasks();
    } else {
        showScreen('login');
    }
});

// Carregar tarefas (exemplo estático)
function loadTasks() {
    taskList.innerHTML = '';
    const tasks = [
        { name: 'Arrumar o quarto', points: 10 },
        { name: 'Lavar a louça', points: 5 },
        { name: 'Revisar tarefas', points: 15 }
    ];
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.textContent = `${task.name} (+${task.points} pontos)`;
        taskItem.addEventListener('click', () => {
            alert(`Você completou: ${task.name}`);
            updatePoints(task.points);
        });
        taskList.appendChild(taskItem);
    });
}

// Atualizar pontos
let totalPoints = 0;
function updatePoints(points) {
    totalPoints += points;
    pointsDisplay.textContent = totalPoints;
}
