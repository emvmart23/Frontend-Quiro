interface Props {
  lastBox: Box;
  expensesWithoutAlcohol: number;
  expensesWithAlcohol: number;
  totalExpenses: number;
}

export default function TotalCurrentSale({
  lastBox,
  expensesWithAlcohol,
  expensesWithoutAlcohol,
  totalExpenses,
}: Props) {
  const isBoxActive = (total: number) =>
    Boolean(lastBox?.state) === true ? total : 0;

  const totalAlcohol = expensesWithAlcohol + expensesWithoutAlcohol;
  const total = totalAlcohol - totalExpenses
  return (
    <table className="w-full md:w-[48%] space-y-[0.1] border-2 border">
      <tr className="flex justify-between p-3">
        <th className="font-medium text-foreground/50">Ingresos con alcohol</th>
        <td>{isBoxActive(+expensesWithAlcohol.toFixed(2))}</td>
      </tr>
      <tr className="flex justify-between p-3">
        <th className="font-medium text-foreground/50">Ingresos sin alcohol</th>
        <td>{isBoxActive(+expensesWithoutAlcohol.toFixed(2))}</td>
      </tr>
      <tr className="flex justify-between p-3 border-t-2">
        <th className="font-medium text-foreground/50">Total ingresos</th>
        <td>{isBoxActive(+totalAlcohol.toFixed(2))}</td>
      </tr>
      <tr className="flex justify-between p-3 border-t-2">
        <th className="font-medium text-foreground/50">Ganancia del dia</th>
        <td>S/.{isBoxActive(+total.toFixed(2))}</td>
      </tr>
    </table>
  );
}
