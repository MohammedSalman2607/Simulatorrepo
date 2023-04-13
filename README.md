Run simulator with 20 seconds of case data.
```
~/workspace/simulator$ node index.js --env qa --vv330 src/ecgFile/vv330_VC0001VP4896_21_sec.json
```
Run simulator with 1000 seconds of case data.
```
~/workspace/simulator$ node index.js --env qa --vv330 src/ecgFile/vv330_VC0001VP4896_1000_sec.json
```

To see all options

```
~/workspace/simulator$ node index.js --help
Options:
  --version    Show version number                                     [boolean]
  --env        Environment - dev/qa
  --vv330      vv330 exported file to replay
  --service    service - MVM/SH
  --patientId  patientId for the case
  --help       Show help                                               [boolean]
~/workspace/simulator$
```

----------------------------------------------------------------
To Generate the vv330 ECG File - replace case number/password and run the following command:
```
mongoexport --uri='mongodb://11.0.54.216,11.0.74.185,11.0.84.165/mvm-data-service?authsource=admin' --username 'mvm-vigo-service1' --password 'v1taLs0nt#Eg0' --collection=vv330_patch_data --query='{ "caseNumber":'\"VC0001VP4896\"'}' --out=/home/ec2-user/local/VC0001VP4896.json --jsonFormat=relaxed --jsonArray --limit 1000 --sort='{"timeStamp": 1}' --skip 30

```