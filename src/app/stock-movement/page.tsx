"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProducts,
  Product,
  createTransaction,
  Transaction,
} from "@/service/productApi";

export default function StockMovementPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [movementType, setMovementType] = useState<"E" | "S">("E");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  function handleBack() {
    router.push("/product-registration");
  }

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: Transaction = {
      code: selectedProduct,
      quantity: quantity,
      type: movementType,
      date: formatDate(date),
    };

    try {
      const result = await createTransaction(transaction);
      if (result) {
        alert("Movimentação de estoque realizada com sucesso!");
        router.push("/product-registration");
      }
    } catch (error) {
      console.error("Erro ao realizar movimentação:", error);
      alert("Erro ao realizar movimentação de estoque.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <form
        className="p-6 bg-gray-100 rounded-lg shadow-md w-[500px]"
        onSubmit={handleSubmit}
      >
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
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.pro_code} value={product.pro_code}>
                  {product.pro_description}
                </option>
              ))}
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
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-semibold">Tipo de Movimentação:</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="movement-type"
                  value="entrada"
                  checked={movementType === "E"}
                  onChange={() => setMovementType("E")}
                />{" "}
                Entrada
              </label>
              <label>
                <input
                  type="radio"
                  name="movement-type"
                  value="saida"
                  checked={movementType === "S"}
                  onChange={() => setMovementType("S")}
                />{" "}
                Saída
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Voltar
          </button>
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
