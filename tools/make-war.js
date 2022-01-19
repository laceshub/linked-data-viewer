var pjson = require("../package.json");
console.log("building WAR package: " + pjson.name);
let currentDir = process.cwd();
console.log("current dir is " + currentDir);

var fs = require("fs");
var distFolder = currentDir + "/dist";
var warFileName = pjson.name + ".war";
var webInfFolder = distFolder + "/WEB-INF";

if (!fs.existsSync(webInfFolder)) {
    fs.mkdirSync(webInfFolder);
}

var webXmlFileContent = `<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
  version="3.0"
  metadata-complete="true">

  <display-name>${pjson.description || pjson.name}</display-name>
  <description>${pjson.description || pjson.name}</description>
</web-app>
`;
var webXmlFileName = webInfFolder + "/web.xml";
fs.writeFileSync(webXmlFileName, webXmlFileContent);

var fileName = __dirname + "/" + warFileName;
var fileOutput = fs.createWriteStream(fileName);

var archiver = require("archiver");
var archive = archiver("zip");

fileOutput.on("close", function () {
    console.log(archive.pointer() + " total bytes");
});

archive.pipe(fileOutput);
archive.glob("**/!(*.map|*.war)", {
    cwd: distFolder
});

archive.on("error", function (err) {
    throw err;
});

archive.on("finish", function (err) {
    if (err) {
        throw err;
    }

    let newFileName = distFolder + "/" + warFileName;
    fs.renameSync(fileName, newFileName);
    console.log("created successfully " + newFileName);

    console.log("delete web.xml");
    fs.unlinkSync(webXmlFileName);
    console.log("...ok");

    console.log("delete WEB-INF");
    fs.rmdirSync(webInfFolder);
    console.log("...ok");
});

archive.finalize();
