import { Command } from "commander";
import { Import } from "./src/scripts/import.js";
import { Validation } from "./src/scripts/validation.js";
import cliProgress from "cli-progress";

const program = new Command();
const progressBar = new cliProgress.SingleBar(
    {
        format: '\x1b[32mProgress | {bar} | {percentage}% | {value}/{total} Steps\x1b[0m', // Testo in verde
        barCompleteChar: '\u2588', // Carattere per la barra completata
        barIncompleteChar: '\u2591', // Carattere per la barra incompleta
        hideCursor: true, // Nasconde il cursore durante l'uso
        stopOnComplete: true, // Ferma la barra alla fine
    },
    cliProgress.Presets.shades_classic
);

program
    .command("import")
    .description("import psp")
    .action(async () => {
        progressBar.start(100, 0); // Avvia la barra con un valore iniziale di 0 e un totale di 100
        await Import(progressBar); // Passa la barra al comando Import
        progressBar.stop(); // Ferma la barra al termine
    });

program
    .command("validation")
    .description("validation psp")
    .action(async () => {
        progressBar.start(100, 0);
        await Validation(progressBar);
        progressBar.stop();
    });

program
    .command("validate-import")
    .description("validation e poi import psp")
    .action(async () => {
        progressBar.start(100, 0);
        await Validation(progressBar);
        await Import(progressBar);
        progressBar.stop();
    });

program.parse(process.argv);
