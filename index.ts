import { Command } from "commander";
import { Import } from "./src/scripts/import.js";
import { Validation } from "./src/scripts/validation.js";
import { Cleanup } from "./src/scripts/cleanup.js";

const program = new Command();

program
  .command("import")
  .description("import psp")
  .action(() => Import());

program
  .command("validation")
  .description("validation psp")
  .action(() => Validation());

program
  .command("updateContractSign")
  .description("Bonifica contratti con contractSign errato")
  .action(() => Cleanup());

program.parse(process.argv);
