"use client";

import { Button } from "@/components/Button";
import { TransactionWithNames, getTransaction } from "@/service/productApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductTablePage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionWithNames[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransaction();
        setTransactions(data || []);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleNewProduct = () => {
    router.push("/product-registration");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center border-b-2 pb-4">
          Produtos Cadastrados
        </h1>
        {loading ? (
          <div className="text-center text-slate-900">Carregando...</div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3 text-left">
                  Nome do Produto
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Quantidade
                </th>
                <th className="border border-gray-300 p-3 text-left">Tipo</th>
                <th className="border border-gray-300 p-3 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-3">
                      {transaction.productName}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {transaction.quantity}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {transaction.type === "E" ? "Entrada" : "Saída"}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-300 p-3 text-center"
                    colSpan={4}
                  >
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <div className="flex justify-between mt-6">
          <Button
            label="Cadastrar Novo Produto"
            variant="submit"
            onClick={handleNewProduct}
          />
          <Button label="Voltar" variant="reset" onClick={handleBack} />
        </div>
      </div>
    </main>
  );
}
