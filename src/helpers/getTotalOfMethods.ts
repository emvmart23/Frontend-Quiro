interface Props {
  Efectivo: number;
  Credito: number;
  Tarjeta: number;
  Yape: number;
  Plin: number;
}

export const getTotalOfMethods = <T extends Props>(allOrders: T[]) => {
  return allOrders?.reduce(
    (acc, curr) => {
      return {
        Efectivo: acc.Efectivo + curr.Efectivo,
        Credito: acc.Credito + curr.Credito,
        Tarjeta: acc.Tarjeta + curr.Tarjeta,
        Yape: acc.Yape + curr.Yape,
        Plin: acc.Plin + curr.Plin,
      };
    },
    {
      Efectivo: 0,
      Credito: 0,
      Tarjeta: 0,
      Yape: 0,
      Plin: 0,
    }
  );
};
