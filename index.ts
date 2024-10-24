import { Command } from "commander";
import { Import } from "./src/scripts/import.js";

const program = new Command();

program
    .name("import")
    .description("import psp")
    .action(Import);

program.parse(process.argv);