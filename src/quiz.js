import inquirer from "inquirer";

import dotenv from "dotenv"
dotenv.config({
    quiet: true
})

import { gerarPerguntas } from "./generateQuestions.js";

const prompt = inquirer.createPromptModule();

//Coleta e armazena as respostas
async function coletarRespostas(perguntas) {
    const respostas = [];

    for (const [index, item] of perguntas.entries()) {
        console.clear();
        console.log(`\n Questão ${index + 1} de ${perguntas.length}\n`);

        const resposta = await prompt([
            {
                type: 'rawlist',
                name: 'escolha',
                message: item.pergunta,
                choices: item.opcoes
            }
        ]);

        respostas.push({
            pergunta: item.pergunta,
            respostaEscolhida: resposta.escolha,
            correta: item.correta_indice,
            opcoes: item.opcoes
        });
    }

    return respostas;
}

//Verificação das respostas
function mostrarResultado(respostas) {
    console.clear();
    let acertos = 0;

    console.log("\n--- RESULTADO ---\n");

    respostas.forEach((r, index) => {
        const acertou = r.respostaEscolhida === r.correta;
        if (acertou) acertos++;

        const alternativaCorreta = r.opcoes.find(o => o.value === r.correta).name;

        console.log(`Questão ${index + 1}: ${r.pergunta}`);
        if(acertou)
            {
                console.log(" Você acertou!");
            } else {
                console.log(`Você errou. Resposta correta: ${alternativaCorreta}`);
            }
        console.log("");
    });

    const percentual = ((acertos / respostas.length) * 100).toFixed(0);
    console.log(`Você acertou ${acertos} de ${respostas.length} questões (${percentual}%).\n`);
}

//Layout principal
const layout = await prompt([
    {
        type: 'input',
        name: 'tema',
        message: 'Qual tema de estudo hoje?',
        default: 'Matemática'
    },
    {
        type: 'number',
        name: 'quantidade',
        message: 'Quantas questões deseja?',
        default: 5,
        validate: function (value) {
            const valid = !isNaN(value);
            return valid || 'Por favor, digite um algarismo válido!';
        }
    },
    {
        type: 'select',
        name: 'dificuldade',
        message: 'Qual dificuldade desejada?',
        choices: ['Fácil', 'Intermediário', 'Difícil'],
        default: 'Intermediário'
    }
]);

console.log("\nGerando perguntas, aguarde...\n");

const perguntas = await gerarPerguntas(layout.tema, layout.quantidade, layout.dificuldade);
const respostas = await coletarRespostas(perguntas);
mostrarResultado(respostas);