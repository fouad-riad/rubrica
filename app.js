rubricaFiltrata = [];
window.onload = () => {
    cerca();
}

function generaHTMLContatti(contatti) {
    const divGroup = document.getElementById("divGroup");
    divGroup.innerHTML = "";

    let indice = 0;

    for (const c of contatti) {
        const strContatto = `
        <div class="col">
            <div class="card border-dark">    
                <div class="card-header">
                    ${c.nome}
                </div>
                <div class="card-body">            
                    <p class="card-text text-muted">email: <a href="mailto:${c.email}">${c.email}</a></p>
                    <p class="card-text text-muted">tel: ${c.tel}</p>
                    <button class="btn btn-danger" onclick="eliminaPerEmail('${c.email}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>    
            </div>
        </div>
        `;

        divGroup.innerHTML += strContatto;

        indice++;
    }
}

function elimina(index) {
    if (confirm("Sei sicuro di voler eliminare il contatto?") == true) {
        rubrica.splice(index, 1);
        cerca();
    }
}

function eliminaPerEmail(email) {
    if (confirm("Sei sicuro di voler eliminare il contatto?") == true) {
        let c = rubrica.find(c => c.email == email);

        if (c) {
            let index = rubrica.indexOf(c);
            rubrica.splice(index, 1);
            cerca();
        }
    }
}

function aggiungiContatto() {
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");
    const inputTel = document.getElementById("tel");

    if (inputNome.value.trim().length == 0) {
        alert("nome obbligatorio");
        return;
    }

    if (inputEmail.value.trim().length == 0) {
        alert("email obbligatoria");
        return;
    }

    if (rubrica.find(c => c.email == inputEmail.value.trim())) {
        alert("email già esistente");
        return;
    }

    if (inputTel.value.trim().length == 0) {
        alert("tel obbligatorio");
        return;
    }

    if (rubrica.find(c => c.tel == inputTel.value.trim())) {
        alert("tel già esistente");
        return;
    }

    let contatto = {
        nome: inputNome.value,
        email: inputEmail.value,
        tel: inputTel.value,
    }

    rubrica.push(contatto);

    inputNome.value = "";
    inputEmail.value = "";
    inputTel.value = "";

    cerca();
}

function cerca() {
    let q = document.getElementById("cerca").value.trim().toLowerCase(); // pippo

    if (q.length > 0) {
        rubricaFiltrata = rubrica.filter(
            c => c.nome.toLowerCase().startsWith(q)
                || c.email.toLowerCase().includes(q)
                || c.tel.toLowerCase().startsWith(q)
        );
    } else {
        rubricaFiltrata = rubrica.filter(c => c);
    }
    generaHTMLContatti(rubricaFiltrata);
}