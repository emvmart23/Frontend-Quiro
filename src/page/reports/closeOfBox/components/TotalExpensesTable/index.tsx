import { useEffect } from "react";

interface Props {
  lastBox: Box;
  totalSalary: number;
  otherExpenses: number;
  setTotalExpenses: (value: number) => void;
  totalExpenses: number;
}

export default function TotalExpensesTable({
  lastBox,
  totalSalary,
  otherExpenses,
  setTotalExpenses,
  totalExpenses,
}: Props) {
  const isBoxActive = (total: number) =>
    Boolean(lastBox?.state) === true ? total : 0;

  useEffect(() => {
    const total = totalSalary + otherExpenses;
    setTotalExpenses(total);
  }, [otherExpenses, setTotalExpenses, totalSalary]);

  return (
    <table className="w-full md:w-[48%] space-y-[0.1] border-2 border">
      <tr className="flex justify-between p-3">
        <th className="font-medium text-foreground/50">Pagos anfitrionas</th>
        <td>{isBoxActive(+totalSalary?.toFixed(2))}</td>
      </tr>
      <tr className="flex justify-between p-3">
        <th className="font-medium text-foreground/50">Otros gastos</th>
        <td>{isBoxActive(+otherExpenses?.toFixed(2))}</td>
      </tr>
      <tr className="flex justify-between p-3 border-t-2">
        <th className="font-medium text-foreground/50">Total gastos</th>
        <td>{isBoxActive(+totalExpenses?.toFixed(2))}</td>
      </tr>
    </table>
  );
}
