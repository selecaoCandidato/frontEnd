export default class CandidatoService {
    constructor(resource, genero) {
        this._resource = resource('candidato{/id}');
        this._genero = resource('candidato/genero');
    }

    salvar(candidato) {
        if(candidato.id){
            return this._resource.update(candidato);
        }else{
            return this._resource.save(candidato);
        }
    }

    listar() {
        return this._resource.query().then(
            res => res.json(),
            err => console.log(err));
    }

    deletar(id) {
        return this._resource.delete({ id })
        .then(null, err => { 
            console.log(err);
            throw new Error("Erro ao deletar");
        });
    }

    buscar(id) {
        return this._resource.get({ id }).then(res => res.json());
    }

    buscarGenero(){
        return this._genero.query().then(
            res => res.json(),
            err => console.log(err));
    }
}