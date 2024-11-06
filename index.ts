import { Command } from "commander";
import { Import } from "./src/scripts/import.js";
import { Validation } from "./src/scripts/validation.js";

const program = new Command();

program
  .command("import")
  .description("import psp")
  .action(() => Import());

program
  .command("validation")
  .description("validation psp")
  .action(() => Validation());

program.parse(process.argv);
