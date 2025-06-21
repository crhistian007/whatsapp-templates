
(function() {
  const subscribers = [];


  let state = [
    new Template("Ejemplo 1", "Mensaje de prueba 1", "demo"),
    new Template("Ejemplo 2", "Mensaje de prueba 2", "prueba")
  ];

  function notify() {
    subscribers.forEach(fn => fn(state));
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
    getState() {
      return state;
    }
  };
})();


