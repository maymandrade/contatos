/*******************************************************************************************
objetivo: arquivo responsável para importar as funções js
versão: 1.1.5.2026
autor: May

********************************************************************************************/
'use strict'

//import das funções do contatos.js
import { getContatos, postContato, putContato, deleteContato } from "./contatos.js"

const nome = document.getElementById('nome')
const telefone = document.getElementById('telefone')
const email = document.getElementById('email')
const foto = document.getElementById('foto')
const senha = document.getElementById('senha')
const table = document.querySelector('tbody#lista-contatos')
const btnSalvar = document.getElementById('botao-cadastrar')

function criarLinha(contato) {

    const tr = document.createElement('tr')
    tr.className = 'border-b border-gray-200 hover:bg-blue-50 transition'

    //id
    const tdId = document.createElement('td')
    tdId.className = 'p-4'
    tdId.textContent = contato.id

    //foto
    const tdFoto = document.createElement('td')
    tdFoto.className = "w-12 h-12 bg-gray-300 rounded-full mx-auto flex items-center justify-center"
    const img = document.createElement('img')
    img.className = 'w-12 h-12 object-cover rounded-full mx-auto'
    img.src = contato.foto
    img.alt = `foto do usuario ${contato.nome}`
    tdFoto.appendChild(img)

    //nome
    const tdNome = document.createElement('td')
    tdNome.className = "p-4 text-gray-700 font-medium"
    tdNome.textContent = contato.nome

    //email
    const tdEmail = document.createElement('td')
    tdEmail.className = 'p-4 text-gray-600'
    tdEmail.textContent = contato.email

    //botoes
    const tdBotoes = document.createElement('td')
    tdBotoes.className = 'p-4'

    const div = document.createElement('div')
    div.className = 'flex justify-center gap-3'

    const btnAtualizar = document.createElement('button')
    btnAtualizar.textContent = 'Atualizar'
    btnAtualizar.className = 'bg-yellow-400 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-full cursor-pointer'

    const btnDeletar = document.createElement('button')
    btnDeletar.textContent = 'Deletar'
    btnDeletar.className = 'bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-full cursor-pointer'

    div.appendChild(btnAtualizar)
    div.appendChild(btnDeletar)
    tdBotoes.appendChild(div)

    tr.appendChild(tdId)
    tr.appendChild(tdFoto)
    tr.appendChild(tdNome)
    tr.appendChild(tdEmail)
    tr.appendChild(tdBotoes)

    btnDeletar.addEventListener('click', async function () {

        await deleteContato(contato.id)

        await carregarContatos()
    })

    table.appendChild(tr)
}

// utiliza GET para carregar os contatos da API
async function carregarContatos() {

    // remove todos os contatos antigos da tabela
    table.innerHTML = ''

    const contatos = await getContatos()

    contatos.forEach(criarLinha)
}


btnSalvar.addEventListener('click', async () => {

    const contato = {
        foto: foto.value,
        nome: nome.value,
        email: email.value,
        telefone: telefone.value
    }

    await postContato(contato)
})

carregarContatos()


