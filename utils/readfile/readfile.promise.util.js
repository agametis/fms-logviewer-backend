const fsPromises = require('fs').promises

const CRLF = '\r\n'
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
        const splited = data.toString().split(CRLF)
        // console.log(splited)
        return splited
      })
      .then((data) => {
        const res = data.map((row) => {
          // eine Zeile
          const oneRow = row.split(TAB)

          // Initialisierung
          let rowTS = new Date(oneRow[0]) // TS Format wird ISO-konform gemacht
          let rowType = ''
          let rowNumber = ''
          let rowAddress = oneRow[3]
          let rowMessage = ''

          if (isDAPI) {
            // einzelne Werte der Zeile
            // DAPI hat eine andere Struktur als Access und Event

            rowType = oneRow[2]
            rowNumber = oneRow[1]
            let userName = oneRow[4] ? oneRow[4] : '-'
            rowMessage = `${userName} ${oneRow[5]} ${oneRow[6]}`
          } else {
            // einzelne Werte der Zeile
            // Access und Event
            rowType = oneRow[1]
            rowNumber = oneRow[2]
            rowMessage = oneRow[4]
          }
          // eine Zeile als Objekt
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
