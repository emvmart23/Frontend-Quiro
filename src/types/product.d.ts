interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  unit_id: number;
  has_alcohol: boolean;
  unit_name: string;
  category_name: string;
  count: number;
  initialPrice: number;
  totalPrice: number;
}

interface UnitMeasure {
  unit_id: number;
  abbreviation: string;
  description: string;
}

interface Orders {
  name: string;
  total_price: number;
  count: number;
  hostess: string;
  price: number;
  mozo: string;
  hostess_id: number;
  has_alcohol: number;
  box_date: string;
  state_doc: number;
  detail_id: number;
}

interface Header {
  id: number;
  mozo: string;
  count: number;
  total_price: number;
  note_sale: string;
  hostess: string;
  hostess_id: number;
  orders: Orders[];
  state: number;
  state_doc: number;
  box_date: string;
  current_user: number;
  created_at: string;
  client: string;
  payments: Payments[];
}

interface Payments {
  id: number;
  detail_id: number;
  payment_method: string;
  mountain: string;
  reference: string;
}

interface Notes {
  id: number;
  client: string;
  hostess: string;
  hostess_id: number;
  issue_date: string;
  total_price: number;
  box_date: string;
  payments: Payments[];
}

interface PaymentField {
  payment_id: number;
  mountain: number;
  reference: string;
}
