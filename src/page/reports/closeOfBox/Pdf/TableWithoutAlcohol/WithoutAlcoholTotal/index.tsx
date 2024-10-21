import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    width: "100%",
    paddingLeft: 14,
    paddingRight: 14,
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
    totalWihtoutAlcohol: Method;
    expensesWithoutAlcohol: number;
}

export default function WithoutAlcoholTotal({ totalWihtoutAlcohol, expensesWithoutAlcohol }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Total</Text>
      <Text style={styles.name}>{totalWihtoutAlcohol?.Efectivo}</Text>
      <Text style={styles.name}>{totalWihtoutAlcohol?.Tarjeta}</Text>
      <Text style={styles.name}>{totalWihtoutAlcohol?.Yape}</Text>
      <Text style={styles.name}>{totalWihtoutAlcohol?.Plin}</Text>
      <Text style={styles.name}>{totalWihtoutAlcohol?.Credito}</Text>
      <Text >{expensesWithoutAlcohol}</Text>
    </View>
  );
}
