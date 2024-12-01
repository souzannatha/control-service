"use client";

import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/service/productApi";

export default function ProductRegistrationPage() {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    category: "",
    price: "",
    location: "",
    barcode: "",
    supplier: "",
    contact: "",
    conditions: "",
  });

  const router = useRouter();

  const handleBack = () => {
    router.push("/stock-movement");
  };

  const handleStock = () => {
    router.push("/product-table");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.code.length < 11) {
      alert("O código do produto deve ter pelo menos 11 caracteres.");
      return;
    }

    const validCategories = ["P", "M", "G"];
    if (!validCategories.includes(formData.category.toUpperCase())) {
      alert("A categoria deve ser uma das seguintes: 'P', 'M', ou 'G'.");
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (isNaN(dataToSend.price)) {
        alert("Por favor, insira um preço válido.");
        return;
      }

      await createProduct(dataToSend);
      alert("Produto cadastrado com sucesso!");

      router.push("/stock-movement");
    } catch (error) {
      console.log("Erro ao salvar produto:", error);
      alert("Ocorreu um erro ao salvar o produto.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center border-b-2 pb-4">
          Cadastro de Produtos e Fornecedores
        </h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSave}
        >
          <h2 className="col-span-full text-xl font-semibold text-slate-800">
            Dados do Produto
          </h2>
          <InputField
            label="Código"
            placeholder="Ex: 12345678901"
            id="code"
            value={formData.code}
            onChange={handleChange}
          />
          <InputField
            label="Descrição"
            placeholder="Digite a descrição"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
          <InputField
            label="Categoria"
            placeholder="P, M ou G"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />
          <InputField
            label="Preço"
            placeholder="R$ 100,00"
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <InputField
            label="Localização no estoque (minímo de 5 letras)"
            placeholder="Ex: Corredor A1"
            id="location"
            value={formData.location}
            onChange={handleChange}
          />
          <InputField
            label="Código de Barras"
            placeholder="Insira o código"
            id="barcode"
            value={formData.barcode}
            onChange={handleChange}
          />
          <h2 className="col-span-full text-xl font-semibold text-slate-800 mt-4">
            Dados do Fornecedor
          </h2>
          <InputField
            label="Nome do Fornecedor"
            placeholder="Ex: Fornecedor XYZ"
            id="supplier"
            value={formData.supplier}
            onChange={handleChange}
          />
          <InputField
            label="Contato"
            placeholder="Ex: email@fornecedor.com"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <InputField
            label="Condições de Fornecimento"
            placeholder="Ex: Entrega em até 5 dias úteis"
            id="conditions"
            value={formData.conditions}
            onChange={handleChange}
          />
          <div className="flex justify-end space-x-4 mt-8 col-span-full">
            <Button label="Salvar" variant="submit" />
            <Button label="Próxima" variant="reset" onClick={handleBack} />
            <Button
              label="Ver Estoque"
              variant="submit"
              onClick={handleStock}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
