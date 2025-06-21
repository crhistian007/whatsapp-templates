(function(){
  const subscribers = [];
  let state = [];  

  function notify() {
    subscribers.forEach(fn => fn(state));
  }

  window.templateStore = {
   
    suscribe(fn) {
      subscribers.push(fn);
      fn(state);
    },
 
    addTemplate(tpl) {
      state.push(tpl);
      notify();
    },
 
    removeTemplate(index) {
      state.splice(index, 1);
      notify();
    },

    getState() {
      return state;
    }
  };
})();


