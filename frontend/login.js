document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3333/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token JWT no localStorage
        window.location.href = 'dashboard.html'; // Redireciona para a dashboard
      } else {
        alert(data.error);  // Exibe a mensagem de erro retornada pelo backend
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
  });