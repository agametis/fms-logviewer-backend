const fsPromises = require('fs').promises

// more info under
// https://en.wikipedia.org/wiki/Newline#Representation

const CR = '\r'
const LF = '\n'
const CRLF = CR + LF // '\r\n'

const platform = process.platform

const TAB = '\t'

const readfile = (fileName, isDAPI) => {
  return new Promise((resolve, reject) => {
    fsPromises
      .readFile(fileName)
      .then((data) => {
        // datatype is Buffer
        // console.log(`MyData: ${data}`)
        // console.log(fileName)
        return data
      })
      .then((data) => {
        // const splited = data.toString().split(CRLF)

        let splited
        // text file on mac and windows has different line ending
        if (platform === 'win32') {
          splited = data.toString().split(CRLF)
        } else {
          splited = data.toString().split(LF)
        }
        // console.log(splited)
        return splited
      })
      .then((data) => {
        const res = data.map((row) => {
          // one row of the file
          const oneRow = row.split(TAB)

          // init
          let rowTS = new Date(oneRow[0]) // do timestamp ISO-conform
          let rowType = ''
          let rowNumber = ''
          let rowAddress = oneRow[3]
          let rowMessage = ''

          if (isDAPI) {
            // DAPI has different structure than Access and Event

            rowType = oneRow[2]
            rowNumber = oneRow[1]
            let userName = oneRow[4] ? oneRow[4] : '-'
            if (oneRow[5] === undefined) { rowMessage = '' } else { rowMessage = `${ userName } ${ oneRow[5] } ${ oneRow[6] }` }
          } else {
            // single values
            // Access und Event
            rowType = oneRow[1]
            rowNumber = oneRow[2]
            rowMessage = oneRow[4]
          }
          // one row as JS object
          let dataObj = {
            ts: rowTS,
            type: rowType,
            num: rowNumber,
            address: rowAddress,
            message: rowMessage,
          }
          // console.log(dataObj)
          // return res.status(200).json(dataObj)
          return dataObj
        })
        // return res
        resolve(res)
      })
      .catch((err) => {
        // console.log(err)
        reject(err)
      })
  })
}

module.exports = { readfile }
