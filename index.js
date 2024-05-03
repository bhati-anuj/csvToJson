const fs = require("node:fs");

const userDataReadSteam = fs.createReadStream(
  `${process.cwd()}/customers-100000.csv`
);

let rawData = "";
userDataReadSteam.on("data", (data) => {
  rawData += data;
  console.log("here is your data.");
});

userDataReadSteam.on("end", () => {
  console.log("There will be no more data.");
});

userDataReadSteam.on("end", () => {
  const arrayData = rawData.split("\n");
  const [stringHeadData, ...arrayBodyData] = arrayData;
  const arrayHeadData = stringHeadData.split(",");
  const bodyDatas = arrayBodyData.map((body) => body.split(","));

  const userData = [];
  for (let i = 0; i < bodyDatas.length; i++) {
    userData.push(arrToObjectData(arrayHeadData, bodyDatas[i]));
  }

  fs.writeFile(`${process.cwd()}/customer-10000.json`, JSON.stringify(userData), (err) => {
    if (err) return console.error(err);
    console.log(`Data written successfully`);
  });
});

function arrToObjectData(arrHeader, arrBody) {
  const data = arrHeader.reduce((prevValue, curValue, curIndex, arr) => {
    return { ...prevValue, [curValue]: arrBody[curIndex] };
  }, {});

  return data;
}
