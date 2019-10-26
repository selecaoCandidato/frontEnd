export default class CandidatoService{
    constructor(resource){
        this.resource = resource('candidato{/id}');
    }

    salvar(candidato){
        if(candidato.id){
            return this.resource.update(candidato)
        }else{
            return this.resource.save(candidato)
        }
    }
    listar(){
        return this.resource.query().then(
            (res) => {
                console.log(res.json());
                return res.json();
            },
            (err) => console.log(err));

    }
    deletar(id){
        return this.resource.delete({id})
        .then(null, err =>{
            console.log(err);
            throw new Error("Error ao deletar");
        });
    }
    buscar(id){
        return this.resource.get({id}).then(res => res.json());
    }
}