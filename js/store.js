(function(){
  const STORAGE_KEY = 'plantillas';
  const subs = [];

  function cargarPlantillas() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map(obj => {
      const tpl = new Template(obj.titulo, obj.mensaje, obj.hashtag);
      tpl.id        = obj.id;
      tpl.createdAt = obj.createdAt;
      return tpl;
    });
  }

  let state = cargarPlantillas();

  function guardarPlantillas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function notify() {
    subs.forEach(fn => fn(state));
    guardarPlantillas(); 
  }

  window.templateStore = {
    suscribe(fn) {
      subs.push(fn);
      fn(state);
    },
    addTemplate(tpl) {
      state = state.concat(tpl);       
      notify();
    },
    updateTemplate(index, tpl) {
      state = state.map((p,i) => i === index ? tpl : p); 
      notify();
    },
    removeTemplate(index) {
      state = state.filter((_,i) => i !== index);         
      notify();
    },
    resetTemplates() {
      state = [];
      localStorage.removeItem(STORAGE_KEY);
      notify();
    },
    getState() {
      return state;
    }
  };
})();


