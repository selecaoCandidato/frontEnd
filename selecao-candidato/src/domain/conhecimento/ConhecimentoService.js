export default class CandidatoService {
    constructor(resource) {
        this._resource = resource('conhecimento{/id}');
    }

    salvar(conhecimento) {
        if(candidato.id){
            return this._resource.update(conhecimento);
        }else{
            return this._resource.save(conhecimento);
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
        return this._resource.get({ id }).then(
          res => res.json()
        );
    }
}
