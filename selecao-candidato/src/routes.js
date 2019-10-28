import Home from './components/home/Home.vue';
import ListarEmpresa from './components/empresa/ListarEmpresa.vue';
import ListarCandidato from './components/candidato/ListarCandidato.vue';
import Empresa from './components/empresa/Empresa.vue';
import Candidato from './components/candidato/Candidato.vue';

export const routes = [
    {path: '', name: 'home', titulo: 'Home', component: Home},
    {path: '/listar-empresa', name: 'listarEmpresa', titulo: 'Empresa', component: ListarEmpresa},
    {path: '/empresa', name:'novoCadastroEmpresa', component: Empresa},
    {path: '/empresa/:id', name:'editarCadastroEmpresa', component: Empresa},
    {path: '/listar-candidato', name: 'listarCandidato', titulo: 'Candidato', component: ListarCandidato },
    {path: '/candidato', name: 'novoCadastroCandidato', component: Candidato },
    {path: '/candidato/:id', name: 'editarCadastroCandidato', component: Candidato }
]
