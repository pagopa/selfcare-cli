import { Command } from "commander";
import { Import } from "./src/scripts/import.js";
import { Validation } from "./src/scripts/validation.js";

const program = new Command();

program.name("import").description("import psp").action(Import);
program.name("validation").description("prova").action(Validation);

program.parse(process.argv);