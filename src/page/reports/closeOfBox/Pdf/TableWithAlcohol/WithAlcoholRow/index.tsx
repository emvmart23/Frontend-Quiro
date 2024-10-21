import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  data: {
    mozo: string;
    Credito: number;
    Efectivo: number;
    Tarjeta: number;
    Yape: number;
    Plin: number;
  }[];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    width: "100%",
    paddingLeft: 8,
    paddingRight: 8,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    marginTop: 3,
  },
  name: {
    width: "15%",
  },
  mozo: {
    width: "16%",
    fontSize: 10,
  },
});

export default function WithAlcoholRow({ data }: Props) {
  return (
    <>
      {data?.map((item, index) => {
        const total =
          item?.Efectivo +
          item?.Credito +
          item?.Tarjeta +
          item?.Yape +
          item?.Plin;
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.mozo}>{item?.mozo}</Text>
            <Text style={styles.name}>{item?.Efectivo}</Text>
            <Text style={styles.name}>{item?.Tarjeta}</Text>
            <Text style={styles.name}>{item?.Yape}</Text>
            <Text style={styles.name}>{item?.Plin}</Text>
            <Text style={styles.name}>{item?.Credito}</Text>
            <Text>{total}</Text>
          </View>
        );
      })}
    </>
  );
}
