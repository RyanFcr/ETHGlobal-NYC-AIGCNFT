const Web3 = require("web3")
const ethUtil = require("ethereumjs-util")
const express = require("express")

const chainid = 11155111
const ainft = "0xbd3c343f5865A2d47c425FcA6595DCF941AE7593"
const prikey = "efba287658a2624a33aaa21b91aab97cb3dac70d3912abdf45d405bfb7ffe2cc"

let app=express()
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  if (req.method == "OPTIONS") res.sendStatus(200)
  else next()
})

// param: to tokenId uri
app.get("/mint", (req, resp)=>{
	try{
		var tokenId = Number(req.query.tokenId)
		var to = req.query.to.toLowerCase()
		var uri = req.query.uri.trim()
		var data = Web3.utils.encodePacked(chainid, ainft, "mint", to, tokenId, uri)
		var hash = Web3.utils.sha3(data)
		var s = ethUtil.ecsign(ethUtil.toBuffer(hash), ethUtil.toBuffer(prikey))
		resp.send({"status":"successful","result":{to,tokenId,uri,v:s.v, r:ethUtil.bufferToHex(s.r), s:ethUtil.bufferToHex(s.s)}})
	}catch(e){
		resp.send({"status":"error","result":e.toStrintg()})
	}
})

// param: tokenId bcn bcnTokenId uri
app.get("/mintByBcn", (req, resp)=>{
	try{
		var tokenId = Number(req.query.tokenId)
		var bcn = req.query.bcn.toLowerCase()
		var bcnTokenId = Number(req.query.bcnTokenId)
		var uri = req.query.uri.trim()
		var data = Web3.utils.encodePacked(chainid, ainft, "mintByBcn", tokenId, bcn, bcnTokenId, uri)
		var hash = Web3.utils.sha3(data)
		var s = ethUtil.ecsign(ethUtil.toBuffer(hash), ethUtil.toBuffer(prikey))
		resp.send({"status":"successful","result":{tokenId,bcn,bcnTokenId,uri,v:s.v, r:ethUtil.bufferToHex(s.r), s:ethUtil.bufferToHex(s.s)}})
	}catch(e){
		resp.send({"status":"error","result":e.toStrintg()})
	}
})

app.listen(9000, ()=>{
    console.log("listen:9000");
})
