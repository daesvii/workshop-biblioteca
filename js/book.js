import { getDOMReferences, anyEmptyField, messageSuccessOperation, deleteRow, validateRows, createRow, attachDeleteListener, constructData } from './utilFunctions.js';

const type = 'libro';

document.addEventListener('DOMContentLoaded', () => {
    const { booksTableContent, bookListEmptyContent } = getDOMReferences(type);
    validateRows(booksTableContent, bookListEmptyContent, type);
});

// Obtener referencias a los elementos del DOM
const { bookTitleInput, bookAuthorInput, bookEditorialInput, bookCategoryInput, bookPublicationDateInput, addBookBtn, booksTableContent, bookListEmptyContent } = getDOMReferences(type);

let bookListCount = 0;

// Función para agregar un nuevo libro a la tabla
addBookBtn.addEventListener('click', () => {
    console.log(bookEditorialInput.value, bookTitleInput.value);
    // Crear un objeto con los datos del libro
    const bookData = constructData(type, bookTitleInput.value, bookAuthorInput.value, bookEditorialInput.value, bookCategoryInput.value, bookPublicationDateInput.value);
    
    // Verificar si algún campo está vacío
    if (anyEmptyField(bookData)) {
        return; // Salir de la función si hay campos vacíos
    }

    validateRows(booksTableContent, bookListEmptyContent, type);

    // Incrementar el contador de libros
    bookListCount++;
    
    const bookFields = ['title', 'author', 'editorial', 'category', 'publicationDate'];
    const newRow = createRow(bookData, bookListCount, bookFields);

    // Agregar la nueva fila a la tabla
    booksTableContent.appendChild(newRow);

    validateRows(booksTableContent, bookListEmptyContent, type);

    // Event listener al botón de eliminar
    attachDeleteListener(newRow);

    // Mostrar un mensaje de éxito
    messageSuccessOperation('Libro agregado con éxito');
});

booksTableContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const rowToDelete = event.target.closest('tr');
        deleteRow(rowToDelete);
        validateRows(booksTableContent, bookListEmptyContent, type);
    }
});