import { Api } from "./Api";

export const createProduct = async (params: {
  code: string;
  description: string;
  category: string;
  price: number;
  location: string;
  barcode: string;
  supplier: string;
  contact: string;
  conditions: string;
}) => {
  try {
    const response = await Api.post("product", {}, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    throw error;
  }
};

interface ApiProduct {
  pro_code: string;
  pro_description: string;
  pro_category: string;
  pro_price: string;
  pro_supplier: string;
  pro_barcode: string;
  pro_location: string;
  pro_contact: string;
  pro_conditions: string;
}

interface ApiResponse {
  status: boolean;
  obj: ApiProduct[];
}

export interface Product {
  pro_code: string;
  pro_description: string;
  pro_category: string;
  pro_price: number;
  pro_supplier: string;
  pro_barcode: string;
  pro_location: string;
  pro_contact: string;
  pro_conditions: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await Api.get<ApiResponse>(
      "http://localhost:3001/product"
    );

    if (response.data.status) {
      return response.data.obj.map((item) => {
        return {
          pro_code: item.pro_code,
          pro_description: item.pro_description,
          pro_category: item.pro_category,
          pro_price: Number(item.pro_price),
          pro_supplier: item.pro_supplier,
          pro_barcode: item.pro_barcode,
          pro_location: item.pro_location,
          pro_contact: item.pro_contact,
          pro_conditions: item.pro_conditions,
        };
      });
    } else {
      throw new Error("Falha na requisição");
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos");
  }
};

export interface Transaction {
  code: string;
  quantity: number;
  type: "E" | "S";
  date: string;
}
export const createTransaction = async (transaction: Transaction) => {
  try {
    const response = await Api.post("http://localhost:3001/transaction", null, {
      params: {
        code: transaction.code,
        quantity: transaction.quantity,
        type: transaction.type,
        date: transaction.date,
      },
    });

    if (response.data.status) {
      return response.data.obj;
    } else {
      throw new Error("Erro ao cadastrar transação");
    }
  } catch (error: unknown) {
    console.error("Erro ao cadastrar transação:", error);
  }
};

export interface TransactionWithNames {
  productName: string;
  quantity: number;
  type: string;
  date: string;
}

export interface ApiResponseWithNames {
  status: boolean;
  obj: TransactionWithNames[];
}

export const getTransaction = async (): Promise<TransactionWithNames[]> => {
  try {
    const response = await Api.get<ApiResponseWithNames>(
      "/transaction/products"
    );

    if (response.data.status) {
      const transactions = response.data.obj.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        type: item.type === "Entrada" ? "E" : "S",
        date: new Date().toISOString(),
      }));

      return transactions;
    } else {
      console.error("Falha ao buscar produtos:", response.data);
      return [];
    }
  } catch (error: unknown) {
    console.error("Erro na requisição:", error);
    throw new Error("Erro ao buscar transações");
  }
};
