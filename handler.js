const staticInitTime = Date.now();
let isColdStart = true;
const serverless = require('serverless-http');
const express = require('express');

const app = express();

app.route('/').get((_req, res) => {
  let coldStartResult = false;
  if (isColdStart) {
    isColdStart = false;
    coldStartResult = true;
  }
  const handlerRunTime = Date.now();
  const resp = {
    handlerRunTime,
    staticInitTime,
    coldStartResult,
    processUptime: process.uptime(),
  }
  res.json(resp);
});

const handler = serverless(app);
module.exports.handler = async (context, req) => {
  context.res = await handler(context, req);
  return context.res.body;
}
