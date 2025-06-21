
class Template {
  constructor(titulo, mensaje, hashtag) {
    this.titulo    = titulo;
    this.mensaje   = mensaje;
    this.hashtag   = hashtag;

    this.id        = Date.now();
    this.createdAt = new Date().toISOString();
  }

  /**
   * Devuelve el HTML para renderizar esta plantilla.
   * @param {number} index índice en el array global
   */
  render(index) {
    return `
      <div class="bg-white rounded-lg p-6 shadow border">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold">${this.titulo} <span class="text-sm text-gray-500">(#${index+1})</span></h3>
          <span class="text-xs text-gray-400">${new Date(this.createdAt).toLocaleString()}</span>
        </div>
        <p class="mb-2 text-gray-700">${this.mensaje}</p>
        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">#${this.hashtag}</span>
      </div>
    `;
  }
}


window.Template = Template;

