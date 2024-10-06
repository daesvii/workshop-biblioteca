import { getDOMReferences, anyEmptyField, messageSuccessOperation, deleteRow, validateRows, createRow, attachDeleteListener, constructData } from './utilFunctions.js';

const type = 'usuario';

document.addEventListener('DOMContentLoaded', () => {

    const { usersTableContent, userListEmptyContent } = getDOMReferences(type);
    validateRows(usersTableContent, userListEmptyContent, type);
});

// Obtener referencias a los elementos del DOM
const { userNameInput, userEmailInput, birthDateInput, addUserBtn, usersTableContent, userListEmptyContent } = getDOMReferences(type);

let userListCount = 0;

// Función para agregar un nuevo usuario a la tabla
addUserBtn.addEventListener('click', () => {
    // Crear un objeto con los datos del usuario
    const userData = constructData(type, userNameInput.value, userEmailInput.value, birthDateInput.value);
    // Verificar si algún campo está vacío
    if (anyEmptyField(userData)) {
      return; // Salir de la función si hay campos vacíos
    }
    validateRows(usersTableContent, userListEmptyContent, type);

    // Incrementar el contador de usuarios
    userListCount++;
    
    const userFields = ['name', 'email', 'birthDate'];
    const newRow = createRow(userData, userListCount, userFields);

    // Agregar la nueva fila a la tabla
    usersTableContent.appendChild(newRow);

    validateRows(usersTableContent, userListEmptyContent, type);

    // Event listener al boton de eliminar
    attachDeleteListener(newRow);

    // Mostrar un mensaje de éxito
    messageSuccessOperation('Usuario agregado con éxito');
});

usersTableContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
      const rowToDelete = event.target.closest('tr');
      deleteRow(rowToDelete);
      validateRows(usersTableContent, userListEmptyContent, type);
  }
});