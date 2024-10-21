import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    width: "100%",
    paddingLeft: 8,
    paddingRight: 5,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    marginTop: 3,
  },
  name: {
    width: "15%",
  },
  total: {
    width: "16%",
    fontSize: 10,
  },
});

interface Props {
  totalWihtAlcohol: Method;
  expensesWithAlcohol: number;
}

export default function WithAlcoholTotal({ totalWihtAlcohol, expensesWithAlcohol }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total</Text>
      <Text style={styles.name}>{totalWihtAlcohol?.Efectivo}</Text>
      <Text style={styles.name}>{totalWihtAlcohol?.Tarjeta}</Text>
      <Text style={styles.name}>{totalWihtAlcohol?.Yape}</Text>
      <Text style={styles.name}>{totalWihtAlcohol?.Plin}</Text>
      <Text style={styles.name}>{totalWihtAlcohol?.Credito}</Text>
      <Text >{expensesWithAlcohol}</Text>
    </View>
  );
}
