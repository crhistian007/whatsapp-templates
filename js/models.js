
class Template {
  constructor(titulo, mensaje, hashtag) {
    this.titulo    = titulo;
    this.mensaje   = mensaje;
    this.hashtag   = hashtag;
    this.id        = Date.now();
    this.createdAt = new Date().toISOString();
  }

  render(index) {
    return `
      <div class="bg-white rounded-lg p-6 shadow border">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-xl font-semibold">
            ${this.titulo} <span class="text-sm text-gray-500">#${index + 1}</span>
          </h3>
          <span class="text-xs text-gray-400">
            ${new Date(this.createdAt).toLocaleString()}
          </span>
        </div>
        <p class="mb-2 text-gray-700">${this.mensaje}</p>
        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-4">
          #${this.hashtag}
        </span>
        <div class="text-right">
          <button onclick="templateStore.removeTemplate(${index})"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Eliminar
          </button>
        </div>
      </div>
    `;
  }
}

window.Template = Template;


