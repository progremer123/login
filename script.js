let isLoginForm = true;

function toggleForm() {
    isLoginForm = !isLoginForm;
    document.getElementById('formTitle').textContent = isLoginForm ? '로그인' : '회원가입';
    document.getElementById('authContainer').querySelector('button').textContent = isLoginForm ? '로그인' : '회원가입';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.querySelector('.toggle').textContent = isLoginForm ? '회원가입' : '로그인';
}

function handleAuth() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (!username || !password) {
        errorMessage.textContent = '아이디와 비밀번호를 입력하세요.';
        errorMessage.style.display = 'block';
        return;
    }

    if (isLoginForm) {
        // 로그인 처리
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username].password === password) {
            successMessage.style.display = 'block';
        } else {
            errorMessage.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
            errorMessage.style.display = 'block';
        }
    } else {
        // 회원가입 처리
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            errorMessage.textContent = '이미 존재하는 아이디입니다.';
            errorMessage.style.display = 'block';
        } else {
            users[username] = { password };
            localStorage.setItem('users', JSON.stringify(users));
            successMessage.textContent = '회원가입 성공! 로그인하세요.';
            successMessage.style.display = 'block';
            toggleForm();
        }
    }
}