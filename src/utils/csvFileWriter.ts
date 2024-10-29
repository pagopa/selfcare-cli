import ObjectsToCsv from "objects-to-csv";

export const csvFileReader = async (results) => {
  (async () => {
    const csv = new ObjectsToCsv(results);

    await csv.toDisk("./export/test.csv");

    //console.log(await csv.toString());
    console.log("Scrittura eseguita correttamente.");
  })();
};
