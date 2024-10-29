import { Command } from "commander";
import { Import } from "./src/scripts/import.js";
import { Validation } from "./src/scripts/validation.js";
import * as dotenv from 'dotenv';

dotenv.config();
const program = new Command();

program
    .name("import")
    .description("import psp")
    .option('-e, --env <environment>', 'specifica l\'ambiente', 'LOCAL_DEV')
    .action(Import);

program.name("validation")
    .description("prova")
    .option('-e, --env <environment>', 'specifica l\'ambiente', 'LOCAL_DEV')
    .action(Validation);

const options = program.opts();
process.env.NODE_ENV = options.env;

program.parse(process.argv);