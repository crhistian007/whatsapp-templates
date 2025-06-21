
const campoTitulo   = document.querySelector("#template-title");
const campoHashtag  = document.querySelector("#template-hashtag");
const campoMensaje  = document.querySelector("#template-message");
const btnGuardar    = document.querySelector("#save-template-btn");
const contenedor    = document.querySelector("#templates-container");

btnGuardar.addEventListener("click", () => {
  const t = campoTitulo.value.trim();
  const m = campoMensaje.value.trim();
  if (!t || !m) {
    alert("Título y mensaje son obligatorios");
    return;
  }
  const plantilla = new Template(t, m, campoHashtag.value.trim());
  window.templateStore.addTemplate(plantilla);

  campoTitulo.value  = "";
  campoHashtag.value = "";
  campoMensaje.value = "";
});


templateStore.suscribe(state => {
  contenedor.innerHTML = state
    .map((tpl, i) => tpl.render(i))
    .join("");
});

