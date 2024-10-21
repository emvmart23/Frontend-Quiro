import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  data: MethodPayment[];
}

const borderColor = "#90e5fc";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 10,
    borderBottom: "1px solid black",
    marginVertical: 1,
    flexGrow: 1
  },
  name: {
    width: "33%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
});

export default function WithAlcoholHeader({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Mozo</Text>
      {data?.map(({ name, id }: MethodPayment) => (
        <Text style={styles.name} key={id}>
          {name}
        </Text>
      ))}
      <Text style={styles.name}>Total</Text>
    </View>
  );
}
