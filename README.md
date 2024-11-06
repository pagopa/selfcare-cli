# selfcare-cli

`This project has been created and initialized for the validation and the importation of PagoPA PSP already contracted that aren't onboarded on selfcare.`

## Description

It's a node.js project that use typescript and commander.js to run two different scripts:
1) Validation:
- for every psp contained in the .csv file it has to be done an API call that returns the information of that psp (if present) on INFOCAMERE service and than compare the pec email field. If the compared field are ok then the validation return OK else if the validation it's not correct return ERROR.
2) Import:
- for every psp validated that has returned OK it's made an API call that onboard the psp to selfcare.

## Installation

1. **secure to have installed on your machine node with a version >=20**

2. Clone the repository: `bash/cmd git clone https://github.com/pagopa/selfcare-cli.git`

3. Enter in the folder project: `bash/cmd cd NameOfFolder`

4. Install the dependecies: `bash/cmd npm install`

5. Update the .env file with the foreign-key


## Use

**If you want just to try one of the two script be sure to be in the development enviroment**

`Go to check how the script are made in the package.json and check validation-dev and import-dev`

**To test the scripts and the API call in the different enviroments you need to go to take yourself the subscription-key from Azure (only for the env that you want to ruun the script for) and set it on .env.development, .env.uat and .env files**

`Validation script`: npm run validation-(env) es: -dev, -uat
`Import script`: npm run import-(env) es: -dev, -uat

## Contributions

1. Create a branch for your feature (`git checkout -b feature/NewFeature`).
2. Commit your changes (`git commit -m 'Added new feature'`).
3. Push the branch (`git push origin feature/NewFeature`).
4. Create a pull request.



