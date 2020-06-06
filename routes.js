const { readfile } = require('./utils')

module.exports = (app) => {
  // root node as info route
  app.route('/').get((req, res) => {
    res.status(404)
    console.log('INF0: "/" was accessed')
  })

  const platform = process.platform

  let filePathAccess = ''
  let filePathEvent = ''
  let filePathDapi = ''

  if (platform === 'win32') {
    filePathAccess = `${ process.env.LOGFILES_ROOT_PATH_WIN }/${ process.env.FILE_ACCESS }`
    filePathEvent = `${ process.env.LOGFILES_ROOT_PATH_WIN }/${ process.env.FILE_EVENT }`
    filePathDapi = `${ process.env.LOGFILES_ROOT_PATH_WIN }/${ process.env.FILE_DAPI }`
  } else {
    filePathAccess = `${ process.env.LOGFILES_ROOT_PATH_MAC }/${ process.env.FILE_ACCESS }`
    filePathEvent = `${ process.env.LOGFILES_ROOT_PATH_MAC }/${ process.env.FILE_EVENT }`
    filePathDapi = `${ process.env.LOGFILES_ROOT_PATH_MAC }/${ process.env.FILE_DAPI }`
  }

  app.use('/access', (req, res) => {
    const now = new Date()
    console.log(`${ now } "/access" was accessed`)

    const isDAPI = false

    readfile(filePathAccess, isDAPI)
      .then((data) => {
        // console.log(filePathAccess)
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(404).json(err)
      })
  })

  app.use('/event', (req, res) => {
    const now = new Date()
    console.log(`${ now } "/event" was accessed`)

    const isDAPI = false

    readfile(filePathEvent, isDAPI)
      .then((data) => {
        // console.log(filePathEvent)
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(404).json(err)
      })
  })

  app.use('/dapi', (req, res) => {
    const now = new Date()
    console.log(`${ now } "/dapi" was accessed`)

    const isDAPI = true

    readfile(filePathDapi, isDAPI)
      .then((data) => {
        // console.log(filePathDapi)
        return res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err)
        return res.status(404).json(err)
      })
  })
}
