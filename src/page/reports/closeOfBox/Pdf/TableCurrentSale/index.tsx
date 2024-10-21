import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  expensesWithoutAlcohol: number;
  expensesWithAlcohol: number;
  totalExpenses: number;
}

const borderColor = "#90e5fc";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#bff0fd",
    alignItems: "center",
    height: "100%",
    width: "58%",
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 12,
    marginVertical: 1,
  },
  name: {
    width: "33%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

export default function TableCurrentSale({
  expensesWithAlcohol,
  expensesWithoutAlcohol,
  totalExpenses,
}: Props) {
  const total = expensesWithAlcohol + expensesWithoutAlcohol;
  const currentRevenue = total - totalExpenses;
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          borderLeftColor: "1px solid black",
          textAlign: "center",
        }}
      >
        <Text>Ingresos con alcohol : </Text>
        <Text>Ingresos sin alcohol : </Text>
        <Text>Total de ingresos : </Text>
        <Text> Ganacia del dia : </Text>
      </View>
      <View style={{ width: "100%" }}>
        <Text>{expensesWithAlcohol}</Text>
        <Text>{expensesWithoutAlcohol}</Text>
        <Text>{total}</Text>
        <Text>S/.{currentRevenue}</Text>
      </View>
    </View>
  );
}
