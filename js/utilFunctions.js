// Obtener referencias a los elementos del DOM
const getDOMReferences = (type) => {
    if (type === 'usuario'){
        const userNameInput = document.getElementById('userName');
        const userEmailInput = document.getElementById('userEmail');
        const birthDateInput = document.getElementById('birthDate');
        const addUserBtn = document.getElementById('addUserBtn');
        const usersTableContent = document.getElementById('usersTableContent');
        const userListEmptyContent = document.getElementById('userListEmptyContent');
        return { userNameInput, userEmailInput, birthDateInput, addUserBtn, usersTableContent, userListEmptyContent };
    }else if (type === 'libro'){
        const bookTitleInput = document.getElementById('bookTitle');
        const bookAuthorInput = document.getElementById('bookAuthor');
        const bookEditorialInput = document.getElementById('bookEditorial');
        const bookCategoryInput = document.getElementById('bookCategory');
        const bookPublicationDateInput = document.getElementById('bookPublicationDate');
        const addBookBtn = document.getElementById('addBookBtn');
        const booksTableContent = document.getElementById('booksTableContent');
        const bookListEmptyContent = document.getElementById('bookListEmptyContent');
        return { bookTitleInput, bookAuthorInput, bookEditorialInput, bookCategoryInput, bookPublicationDateInput, addBookBtn, booksTableContent, bookListEmptyContent }
    } else {
        return console.log('tipo incorrecto');
    }
};

// Función genérica para crear un objeto con los datos proporcionados
const constructData = (type, ...args) => {
    if (type === 'libro') {
        const [title, author, editorial, category, publicationDate] = args;
        return {
            title: title,
            author: author,
            editorial: editorial,
            category: category,
            publicationDate: publicationDate
        };
    } else if (type === 'usuario') {
        const [userName, userEmail, birthDate] = args;
        return {
            name: userName,
            email: userEmail,
            birthDate: birthDate
        };
    } else {
        return console.log('Tipo de entidad no válido');
    }
};

// Función para validar si algún campo está vacío
const anyEmptyField = (data) => {
    const values = Object.values(data);

    if (values.some(value => typeof value === 'string' && value.trim() === '')) {
        Swal.fire({
            title: 'Error!',
            text: 'Algunos campos están vacíos',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return true; 
    }
    return false; 
};

// Función para mostrar un mensaje de éxito
const messageSuccessOperation = (text) => {
    Swal.fire({
        text: text,
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

// Funcion para crear filas tanto para usuarios como libros
const createRow = (rowData, count, fields) => {
    const newRow = document.createElement('tr');
    let innerHTML = `<th scope="row">${count}</th>`;
    
    fields.forEach(field => {
        innerHTML += `<td>${rowData[field]}</td>`;
    });
    
    innerHTML += `<td><button type="button" class="btn btn-danger delete-btn">Eliminar</button></td>`;
    newRow.innerHTML = innerHTML;
    
    return newRow;
};


// Función para eliminar una fila de usuario
const deleteRow = (row) => {
    row.remove();
};

// Función para validar las filas en la tabla
const validateRows = (tableContent, emptyContent, type) => {
    const rows = tableContent.querySelectorAll('tr');
    if (rows.length === 0) {
        emptyContent.innerHTML = `<div class="container"><h4 style="float: left; font-size: 25px;">No se ha guardado ningún ${type}</h4> <img src="../img/x.png" alt="" style ="width: 3rem; height: 2rem; padding-top: 2px; padding-left: 13px;"></div>`;
    } else {
        emptyContent.innerHTML = ``;
    }
};

const attachDeleteListener = (row) => {
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        row.remove();
    });
  };

export { getDOMReferences, anyEmptyField, messageSuccessOperation, deleteRow, validateRows, createRow, attachDeleteListener, constructData };