
const campoTitulo   = document.querySelector("#template-title");
const campoHashtag  = document.querySelector("#template-hashtag");
const campoMensaje  = document.querySelector("#template-message");
const btnGuardar    = document.querySelector("#save-template-btn");
const contenedor    = document.querySelector("#templates-container");

let editingIdx = null;


btnGuardar.addEventListener("click", () => {
  const t = campoTitulo.value.trim();
  const m = campoMensaje.value.trim();
  if (!t || !m) {
    Swal.fire("Error", "Título y mensaje son obligatorios", "error");
    return;
  }
  const tpl = new Template(t, m, campoHashtag.value.trim());
  templateStore.addTemplate(tpl);
  campoTitulo.value  = "";
  campoHashtag.value = "";
  campoMensaje.value = "";
});


window.startEditing = index => {
  const tpl = templateStore.getState()[index];
  campoTitulo.value   = tpl.titulo;
  campoHashtag.value  = tpl.hashtag;
  campoMensaje.value  = tpl.mensaje;
  editingIdx = index;
  Swal.fire({
    position: "top-end",
    icon: "info",
    title: "Modo edición activado",
    text: "Los cambios se guardarán automáticamente",
    showConfirmButton: false,
    timer: 1000
  });
};


[campoTitulo, campoHashtag, campoMensaje].forEach(el =>
  el.addEventListener("input", () => {
    if (editingIdx === null) return;
    const t = campoTitulo.value.trim();
    const m = campoMensaje.value.trim();
    const h = campoHashtag.value.trim();
    const tpl = new Template(t, m, h);

    tpl.id        = templateStore.getState()[editingIdx].id;
    tpl.createdAt = templateStore.getState()[editingIdx].createdAt;
    templateStore.updateTemplate(editingIdx, tpl);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Guardado automático",
      showConfirmButton: false,
      timer: 800
    });
  })
);


window.promptDelete = index => {
  Swal.fire({
    title: "¿Confirmar eliminación?",
    text: "Esta acción es irreversible.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      templateStore.removeTemplate(index);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Plantilla eliminada",
        showConfirmButton: false,
        timer: 800
      });
    }
  });
};

templateStore.suscribe(state => {
  contenedor.innerHTML = state.map((tpl, i) => tpl.render(i)).join("");
});



