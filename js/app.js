
const campoTitulo   = document.querySelector("#template-title");
const campoHashtag  = document.querySelector("#template-hashtag");
const campoMensaje  = document.querySelector("#template-message");
const btnGuardar    = document.querySelector("#save-template-btn");
const btnReset      = document.querySelector("#reset-btn");
const contenedor    = document.querySelector("#templates-container");


btnGuardar.addEventListener("click", () => {
  const t = campoTitulo.value.trim();
  const m = campoMensaje.value.trim();
  if (!t || !m) {
    Swal.fire("Error", "Título y mensaje son obligatorios", "error");
    return;
  }
  const tpl = new Template(t, m, campoHashtag.value.trim());
  templateStore.addTemplate(tpl);
  campoTitulo.value = "";
  campoHashtag.value= "";
  campoMensaje.value= "";
});


btnReset.addEventListener("click", () => {
  Swal.fire({
    title: "¿Eliminar todas las plantillas?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar todo"
  }).then(res => {
    if (res.isConfirmed) {
      templateStore.resetTemplates();
      Swal.fire("Listo", "Todas las plantillas han sido eliminadas", "success");
    }
  });
});


templateStore.suscribe(state => {
  contenedor.innerHTML = state.map((tpl, i) => tpl.render(i)).join("");
});


