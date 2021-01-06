const axios = require("axios");
const fs = require("fs");
const dayjs = require("dayjs");
require('dotenv').config()

require("dayjs/locale/zh-tw");
dayjs.locale("zh-tw");


const { DIR_NAME, JWT_TOKEN, COOKIE_VALUE, USER_ID, ADD_YAML_HEADER } = process.env;
const COOKIE = '__cfduid=' + COOKIE_VALUE;
const addYaml = ADD_YAML_HEADER === '1';

(function createDir() {
  if (!fs.existsSync(DIR_NAME)) {
    fs.mkdirSync(`/${DIR_NAME}`);
  }
})();

async function asyncGetPageNum() {
  try {
    let res = await axios({
      url: `https://learning-api.lidemy.com/v1/users/${USER_ID}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
        Cookie: COOKIE,
      },
    });

    return Promise.resolve(Math.ceil(res.data.length / 10));
  } catch (err) {
    console.log("get pages error");
    console.log(err.message);
  }
}

async function requetsReportsByPage(page) {
  const config = {
    method: "get",
    url: `https://learning-api.lidemy.com/v1/users/${USER_ID}/reports?page=${page}`,
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
      Cookie: COOKIE,
    },
  };

  try {
      let res = await axios(config);
    const rawReports = res.data.reports;
    const pureReports = rawReports.map(
      ({ createdAt, wordCount, User, content }) => {
        return {
          username: User.nickname,
          content,
          createdAt,
          wordCount,
        };
      }
    );

    pureReports.forEach((cleanReport) => {
      saveToMD(cleanReport);
    });
  } catch (err) {
    console.log("requetsReportsByPage error");
    console.log(err.message);
  }
}

function saveToMD({ username, wordCount, createdAt, content }) {
  const filename = createdAt
    .split(/[T.]+/g)
    .slice(0, 2)
    .join("_")
    .replace(/:/g, "");

  const date_time = createdAt.split(/[T.]+/g).slice(0, 2).join(" ");

  const addYamlHeaderContent = `---
username: ${username}
title: ${date_time}
date: ${date_time}
wordCount: ${wordCount}
---
${content}`;
  
  fs.writeFile(`${DIR_NAME}/${filename}.md`, addYaml ? addYamlHeaderContent : content, (err) => {
    if (err) {
      console.log(filename + "error");
    }
    console.log(filename + " saved");
  });
}


async function getReportsFromLidemy() {
    try {
        const pages = await asyncGetPageNum()
        for (let i = 1; i <= pages; i++) {
            requetsReportsByPage(i)
        }
        // console.log(pages);

    } catch (err) {
        console.log(err);
    }
}
getReportsFromLidemy();