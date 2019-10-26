export default class Candidato{
    constructor(id ='', nome='', idade ='', sexo='', telefone='',empresa={},conhecimentos=[], observacao= '' ){
            this.id = id;
            this.nome = nome;
            this.idade= idade;
            this.sexo = sexo;
            this.telefone = telefone;
            this.empresa= empresa;
            this.observacao = observacao;
            this.conhecimentos = conhecimentos
    }
}
