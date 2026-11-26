
async function ModificarTarea( id: string, titulo: string, descripcion: string, responsable: string){

  const urlPUT = `http://localhost:3001/tareas/${id}`;

  if(titulo.trim() === "" || responsable.trim() === ""){ //valida que no este vacio o hayan espacios
    return;

  }else{
    try{
      const datosModificada = { 
        titulo: titulo, 
        descripcion: descripcion,
        responsable: responsable
      } 

      const respuesta = await fetch(urlPUT, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(datosModificada),
      })

      if (!respuesta.ok) throw new Error("Error HTTP"); //comrpueba si la peticin ha salido bien
      const tareaModificada = await respuesta.json()
      return tareaModificada;

    } catch (err) {
      throw err;
    }
  }

}

export default ModificarTarea;