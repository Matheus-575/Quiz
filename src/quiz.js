import inquirer from "inquirer"
const prompt = inquirer.createPromptModule()

// Configuração das questões
const layout = await prompt
(
    [
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
            validate: function(value) 
            {
                const valid = !isNaN(value);
                return valid || 'Por favor, digite um algarismo válido!'
            }
        },
        {
            type: 'select',
            name: 'dificuldade',
            message: 'Qual dificuldade desejada?',
            choices: 
            [
                'Fácil',
                'Intermediário',
                'Difícil'
            ],
            default: 'Intermediário'
        }
    ]
)

//Questões temporárias
const quest = await prompt 
(
    [
        {
            type: 'rawlist',
            name: 'questão1',
            message: 'Quanto é 1+1?',
            choices: 
            [
                
                {name: '1', value: 0},
                {name: '2', value: 1},
                {name: '3', value: 2}
            ]
        },
        {
            type: 'select',
            name: 'questão2',
            message: 'Isso está funcionando?',
            choices: 
            [
                'Sim',
                'Não'
            ]
        }
    ]
)

//Verficação provisória
if (quest.questão1 === 1){
    console.log("===Questão 1 correta!!===");
} else 
    {
        console.log("Você errou a questão 1!");
    }