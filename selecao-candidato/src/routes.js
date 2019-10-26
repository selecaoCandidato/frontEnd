import Home from './components/home/Home.vue';
import ListarEmpresa from './components/empresa/ListarEmpresa.vue';
import Empresa from './components/empresa/Empresa.vue';

import ListarCandidatos from './components/candidato/ListarCandidatos.vue';
import Candidato from './components/candidato/Candidato.vue';

export const routes = [
    {path: '', name: 'home', titulo: 'Home', component: Home},
    {path: '/listar-empresa', name: 'listarEmpresa', titulo: 'Empresa', component: ListarEmpresa},    
    {path: '/empresa', name:'novoCadastro', component: Empresa},
    {path: '/empresa/:id', name:'editarCadastro', component: Empresa},

    {path: '/listar-candidato', name: 'listarCandidato', titulo: 'Candidato', component: ListarCandidatos},
    {path: '/candidato', name: 'novoCandidato', component: Candidato},
    {path: '/candidato/:id', name: 'editarCandidato', component:Candidato}
]