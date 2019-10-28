export default class Candidato {
    constructor(id='', nome='', idade='', sexo='',
    telefone='', idEmpresa = '', empresa='', observacao='',
    listConhecimento = [], listConhecimentoDeletado = []){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.telefone = telefone;
        this.idEmpresa = idEmpresa;
        this.empresa = empresa;
        this.observacao = observacao;
        this.listConhecimento = listConhecimento;
        this.listConhecimentoDeletado = listConhecimentoDeletado;
    }
}