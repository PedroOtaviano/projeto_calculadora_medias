const form = document.getElementById("formAtividade");
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="aprovado">Aprovado</span>';
const spanReprovado = '<span class="reprovado">Reprovado</span>';

let linhas = "";

function validarNota(Nota){
    if (parseInt(Nota) >= 7){
        return imgAprovado; 
    }else{
        return imgReprovado;
    }
}

form.addEventListener("submit", function(e){
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById("nomeAtividade");
    const inputNota = document.getElementById("nota");

    if (atividades.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida.`)
        return;
    }else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNota.value));
    
        let linha = "<tr>";
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNota.value}</td>`;
        linha += `<td>${validarNota(inputNota.value)}`;
        linha += `</tr>`;
    
        linhas += linha;
    }

    inputNomeAtividade.value = "";
    inputNota.value = "";   
}

function atualizaTabela(){
    const corpoTabela = document.querySelector("tbody");
    corpoTabela.innerHTML = linhas;

}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();
    document.getElementById("mediaFinal").innerHTML = mediaFinal.toFixed(2);
    document.getElementById("mediaFinalResultado").innerHTML = mediaFinal >= 7 ? spanAprovado : spanReprovado;            ;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}