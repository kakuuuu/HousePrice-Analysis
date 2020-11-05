const https = require("https");
const cheerio = require("cheerio");
const config = require("../bin/config.js");
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;
const queryLoaction = require('../api/queryLoaction.js')

// 抓取开始

// updateData('hz');

function updateData(city) {
  const startPage = config.startPage;
  const url = config.prefixUrl + city + config.suffixUrl;
  getData(url, startPage, city);
}

function getData(url, page, city) {

  let result = [];
  // 开始页

  // 结束页
  const endPage = config.endPage;


  https.get(url + page, res => {
    let data = "";
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      let formatData = filter(data, city); // 筛选出需要的数据
      result = result.concat(formatData); // 拼接此次抓取到的数据
      page++;
      if (page <= endPage) {
        getData(url, page, city); // 递归继续抓取
      } else {
        return ;
      }
    });
  });

}

function filter(data,city) {
  let final = []; // 用来存储本页所有数据信息
  //将页面源代码转换为$对象
  let $ = cheerio.load(data);

  // 找到列表外层

  let items = $(
    ".resblock-list-container .resblock-list-wrapper li.resblock-list"
  );

  // 遍历处理每一条数据

  items.map((index, item) => {
    let title = $(item).find(".name").text().trim();
    let number = $(item).find(".number").text().trim();
    let unit = $(item).find(".desc").text().trim();
    let info = $(item).find("div.resblock-location").text().replace(/\s/g, "").replace(/\//g, "");
    queryLoaction(info).then(res => {
      if (res.data.status === 0) {
        let lng = res.data.result.location.lng;
        let lat = res.data.result.location.lat;
        let addSql = `INSERT INTO house(title,number,unit,info,city,lng,lat) VALUES("${title}","${number}","${unit}","${info}","${city}",${lng},${lat})`;
        sqlQuery(addSql).then(res=>{
        },err=>{
          console.log(err);
        })
        
      }
    })
  });
  return final;
}

module.exports=updateData;