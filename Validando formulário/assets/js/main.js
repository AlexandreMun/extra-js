class ValidaForm {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validCampos = this.isValid();
    const senhasValidas = this.senhasSaoValidas();

    if(validCampos && senhasValidas) {
      alert('Formulário enviado.');
      this.formulario.submit();
    }
  }

  // Verificação senha
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.createError(senha, 'Campos senhas e repetir senha precisam ser iguais.');
      this.createError(repetirSenha, 'Campos senhas e repetir senha precisam ser iguais.');
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.createError(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  // Verificação
  isValid() {
    let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerHTML;

      // Campo vazio
      if(!campo.value) {
        this.createError(campo, `Campo ${label} não pode estar em branco.`);
        valid = false;
      }

      // CPF
      if(campo.classList.contains('cpf')) {
        if(!this.validaCPF(campo)) valid = false;
      }

      // User
      if(campo.classList.contains('usuario')) {
        if(!this.validaUser(campo)) valid = false;
      }
    }

    return valid;
  }

  // Validar usuario
  validaUser(campo) {
    const usuario = campo.value;
    let valid = true;

    if(usuario.length < 3 || usuario.length > 12) {
      this.createError(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
      valid = false;
    }

    if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(campo, 'Usuário precisa conter apenas letras e/ou números.')
      valid = false;
    }
    
    return valid;
  }

  // Validar CPF
  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if(!cpf.valida()) {
      this.createError(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }

  // Cria erro
  createError(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaForm();
// 075.699.320-21