(function(){
  const STORAGE_KEY = 'plantillas';
  const subscribers = [];


  function cargarPlantillas() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
s
    const arr = JSON.parse(raw);
    return arr.map(obj => {
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
    subscribers.forEach(fn => fn(state));
    guardarPlantillas(); 
  }

  window.templateStore = {
    suscribe(fn) {
      subscribers.push(fn);
      fn(state);
    },
    addTemplate(tpl) {
 
      state = state.concat(tpl);
      notify();
    },
    removeTemplate(index) {

      state = state.filter((_, i) => i !== index);
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


