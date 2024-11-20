export default function StockMovementPage() {
  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <form className="p-6 bg-gray-100 rounded-lg shadow-md w-[500px]">
        <h1 className="text-2xl font-bold mb-6">Movimentação de Estoque</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="product" className="block font-semibold">
              Produto:
            </label>
            <select
              id="product"
              name="product"
              className="w-full border rounded-md p-2"
            >
              <option value="">Selecione um produto</option>
              <option value="1">Produto 1</option>
              <option value="2">Produto 2</option>
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block font-semibold">
              Quantidade:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="w-full border rounded-md p-2"
              placeholder="Ex: 10"
            />
          </div>

          {/* Tipo de Movimentação */}
          <div>
            <label className="block font-semibold">Tipo de Movimentação:</label>
            <div className="flex items-center space-x-4">
              <label>
                <input type="radio" name="movement-type" value="entrada" />{" "}
                Entrada
              </label>
              <label>
                <input type="radio" name="movement-type" value="saida" /> Saída
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block font-semibold">
              Data:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
          >
            Confirmar
          </button>
        </div>
      </form>
    </main>
  );
}
