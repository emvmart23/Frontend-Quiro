import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { useEffect } from "react";

interface Props {
  getTotalOfExpenses: number;
  totalSalary: number;
  setTotalExpenses: (value: number) => void;
  totalExpenses: number;
}

const borderColor = "#90e5fc";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#bff0fd",
    alignItems: "center",
    height: "100%",
    width: "50%",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 14,
    marginVertical: 1,
  },
  name: {
    width: "33%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

export default function TableTotalExpenses({
  totalSalary,
  getTotalOfExpenses,
  setTotalExpenses,
  totalExpenses,
}: Props) {
  useEffect(() => {
    const total = totalSalary + getTotalOfExpenses;
    setTotalExpenses(total);
  }, [getTotalOfExpenses, setTotalExpenses, totalSalary]);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          borderLeftColor: "1px solid black",
          textAlign: "right",
        }}
      >
        <Text style={{ textAlign: "right" }}>Pagos anfitrionas : </Text>
        <Text style={{ textAlign: "right" }}>Otros gastos : </Text>
        <Text style={{ textAlign: "right" }}>Total de gastos : </Text>
      </View>
      <View style={{ width: "100%" }}>
        <Text>{totalSalary}</Text>
        <Text>{getTotalOfExpenses}</Text>
        <Text>{totalExpenses}</Text>
      </View>
    </View>
  );
}
