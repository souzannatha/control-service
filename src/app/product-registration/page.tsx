"use client";

import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { useRouter } from "next/navigation";

export default function ProductRegistrationPage() {
  const router = useRouter();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    router.push("/stock-movement");
  }

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center border-b-2 pb-4">
          Cadastro de Produtos
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Código"
            placeholder="Ex: 12345"
            id="product-code"
          />
          <InputField
            label="Descrição"
            placeholder="Digite a descrição"
            id="product-code"
          />
          <div>
            <label htmlFor="category" className="block font-semibold">
              Categoria:
            </label>
            <select
              id="category"
              name="category"
              className="w-full border rounded-md p-2"
            >
              <option value="">Selecione uma categoria</option>
              <option value="alimentacao">Alimentação</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="vestuario">Vestuário</option>
            </select>
          </div>
          <InputField
            label="Quantidade Inicial"
            placeholder="10"
            id="product-code"
          />
          <InputField
            label="Preço"
            placeholder="R$ 100,00"
            id="product-code"
            type="number"
          />
          <InputField
            label="Localização do armazém"
            placeholder="Ex: Correador A1"
            id="product-code"
          />
          <InputField
            label="Fornecedor"
            placeholder="Nome do Fornecedor"
            id="product-code"
          />
          <div>
            <label htmlFor="expiry-date" className="block font-semibold">
              Data de Validade:
            </label>
            <input
              type="date"
              id="expiry-date"
              name="expiry-date"
              className="w-full border rounded-md p-2"
            />
          </div>
          <InputField
            label="Código de Barras"
            placeholder="Insira o código"
            id="product-code"
          />
        </form>
        <div className="flex justify-end space-x-4 mt-8">
          <Button label="Salvar" variant="submit" />
          <Button label="Limpar" variant="reset" />
          <Button label="Próximo" variant="submit" onClick={handleLogin} />
        </div>
      </div>
    </main>
  );
}
