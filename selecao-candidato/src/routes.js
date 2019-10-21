import Home from './components/home/Home.vue';
import ListarEmpresa from './components/empresa/ListarEmpresa.vue';
import Empresa from './components/empresa/Empresa.vue';

export const routes = [
    {path: '', name: 'home', titulo: 'Home', component: Home},
    {path: '/listar-empresa', name: 'listarEmpresa', titulo: 'Empresa', component: ListarEmpresa},    
    {path: '/empresa', name:'novoCadastro', component: Empresa},
    {path: '/empresa/:id', name:'editarCadastro', component: Empresa}
]