/*******************************************************************************************
objetivo: arquivo responsável para consumo de api
versão: 1.1.5.2026
autor: May

********************************************************************************************/

const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

// GET
export async function getContatos() {
    //Esse trecho faz uma requisição para uma API usando fetch, verifica se a resposta deu certo e depois transforma os dados em JSON.
    //crie uma variavel com resposta do servidor
    //fetch é uma função do JavaScript usada para fazer requisições para uma API ou servido
    const response = await fetch (URL)
    //se não for ok ele vai disparar um erro 
    if(!response.ok) throw new Error('Erro ao buscar contatos') //função para ser usada por outros programadores, vvai gerar um erro se não encontrar os dados na api 
    //Se a resposta estiver correta, essa linha transforma a resposta da API em JSON.
    
    //não está no if
    return response.json()
}  

//POST
//recebe um JSON de contato, com todas as informções
/* 
{
    celular
    email
    endereco
    foto
    id
    nome
}
*/
export async function postContato(contato) {
    //necessário informar que metodo dejeso usar pois se não ele vai direto para um get
    //Esse trecho cria um objeto chamado options, que configura como o fetch vai enviar a requisição para a API.
    //Ela guarda as configurações da requisição.
    const options = {
        //O método POST é usado para cadastrar/enviar dados para uma API.
        method: 'POST',
        //O headers envia informações extras para a API.
        headers: {
            //“Estou enviando os dados no formato JSON.”
            'Content-Type': 'application/json'
        },
        //O body é o conteúdo que você está enviando para a API
        //Esse código prepara uma requisição para cadastrar dados em uma API usando POST
        //Sem o body, ele apenas informa que quer enviar JSON, mas ainda não envia os dados em si
        body: JSON.stringify(contato)
    }
    //faz a requisição para a API usando a URL e as configurações que estão dentro de options
    const response = await fetch(URL, options)
    if(!response.ok) throw new Error('Erro ao criar um novo contato')
    
    // não está no if
    return response.json()
}


//PUT
//função para atualizar um contato
//diferensa está no verbo e 
export async function putContato(id, contato) {
    const options = {
        method: 'PUT',
        headers:{
            //Aqui você informa para a API que os dados enviados estão no formato JSON.
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }
    //está fazendo a requisição para a API
    const response = await fetch(`${URL}/${id}`, options)

    if(!response.ok) throw new Error('Erro ao atualizar contato')

    // não está no if
    return response.json()
}

//DELETE
export async function deleteContato(id) {
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${URL}/${id}`, options)
    if(!response.ok) throw new Error('Erro ao deletar contato')

    // não está no if
    return true
}