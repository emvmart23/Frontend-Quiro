import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import WithAlcoholHeader from "./TableWithAlcohol/WithAlcoholHeader";
import WithoutAlcoholHeader from "./TableWithoutAlcohol/WithoutAlcoholHeader";
import WithAlcoholRow from "./TableWithAlcohol/WithAlcoholRow";
import WithAlcoholTotal from "./TableWithAlcohol/WithAlcoholTotal";
import WithoutAlcoholRow from "./TableWithoutAlcohol/WithoutAlcoholRow";
import WithoutAlcoholTotal from "./TableWithoutAlcohol/WithoutAlcoholTotal";
import TableTotalExpenses from "./TableTotalExpenses";
import TableCurrentSale from "./TableCurrentSale";
import { useState } from "react";
interface OrderPdf {
  mozo: string;
  Credito: number;
  Efectivo: number;
  Tarjeta: number;
  Yape: number;
  Plin: number;
}

interface Props {
  lastBox: Box
  expensesWithoutAlcohol: number;
  totalWihoutAlcohol: Method;
  totalWihtAlcohol: Method;
  withOrder: OrderPdf[];
  nameMethods: MethodPayment[];
  expensesWithAlcohol: number;
  withoutOrder: OrderPdf[];
  getTotalOfExpenses: number;
  totalSalary: number;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 15,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: "column",
    backgroundColor: "#f5f5f5"
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderTop: "1px solid black",
  },
  tableContainerCurrentSale: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
  },
  boxTitle: {
    fontSize: 10,
  },
});

export default function PdfBox({
  lastBox,
  expensesWithoutAlcohol,
  withOrder,
  withoutOrder,
  nameMethods,
  totalWihtAlcohol,
  totalWihoutAlcohol,
  expensesWithAlcohol,
  getTotalOfExpenses,
  totalSalary,
}: Props) {
  const [totalExpenses, setTotalExpenses] = useState(0)
  const mmToPt = (mm: number) => mm * 2.83465;
  return (
    <Document>
      <Page size={[mmToPt(180), mmToPt(220)]} style={styles.page}>
        <Text>Reporte de cierre de cajas</Text>
        <Text>Fecha caja : {lastBox?.opening}</Text>
        <View style={styles.tableContainer}>
          <WithAlcoholHeader data={nameMethods} />
          <WithAlcoholRow data={withOrder} />
          <WithAlcoholTotal
            totalWihtAlcohol={totalWihtAlcohol}
            expensesWithAlcohol={expensesWithAlcohol}
          />
          ;
        </View>
        <View style={styles.tableContainer}>
          <WithoutAlcoholHeader data={nameMethods} />
          <WithoutAlcoholRow data={withoutOrder} />
          <WithoutAlcoholTotal
            totalWihtoutAlcohol={totalWihoutAlcohol}
            expensesWithoutAlcohol={expensesWithoutAlcohol}
          />
        </View>
        <View style={styles.tableContainerCurrentSale}>
          <TableTotalExpenses
            getTotalOfExpenses={getTotalOfExpenses}
            totalSalary={totalSalary}
            setTotalExpenses={setTotalExpenses}
            totalExpenses={totalExpenses}
          />
        </View>
        <View style={styles.tableContainerCurrentSale}>
          <TableCurrentSale
          totalExpenses={totalExpenses}
            expensesWithAlcohol={expensesWithAlcohol}
            expensesWithoutAlcohol={expensesWithoutAlcohol}
          />
        </View>
      </Page>
    </Document>
  );
}
