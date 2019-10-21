export default class EmpresaService {
    constructor(resource) {
        this._resource = resource('empresa{/id}');
    }

    salvar(empresa) {
        if(empresa.id){
            return this._resource.update(empresa);
        }else{
            return this._resource.save(empresa);
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
}