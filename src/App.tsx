import { Routes, Route, Navigate } from 'react-router';
import styled from '@emotion/styled';

import Login from './components/Login';
import Registro from './components/Registro';
import Logout from './components/Logout';

import ListadoCoches from './layout/ListadoCoches';
import EditarCoche from './components/EditarCoches';
import NuevoCoche from './components/NuevoCoche';
import TarjetaCoche from './components/TarjetaCoche';

import PerfilUsuario from './components/PerfilUsuario';
import EditarUsuario from './components/EditarUsuario';
import ListadoUsuarios from './layout/ListadoUsuarios';

function App(){
  return(
      <>
        <Routes>
          {/* AUTENTICACION */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/logout" element={<Logout />} />

          {/* COLECCION COCHES */}
            <Route path="/coches" element={<ListadoCoches />} />
            <Route path="/coches/nuevo" element={<NuevoCoche />} />
            <Route path="/coches/:id" element={<TarjetaCoche />} />
            <Route path="/coches/:id/editar" element={<EditarCoche />} />

          {/* COLECCION USUARIOS */}
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="/usuarios" element={<ListadoUsuarios />} />
            <Route path="/usuarios/:id/editar" element={<EditarUsuario />} />
        </Routes>
    </>
  )
  
  
}
export default App;
