const router = require('express').Router()
const axios = require('axios')
var mysql = require('mysql');


// create a connection variable with the required details
var con = mysql.createConnection({
  host: "digicoviddb.clmftprgwipd.us-east-1.rds.amazonaws.com", // ip address of server running mysql
  user: "admin", // user name to your mysql database
  password: "digi.covid.1", // corresponding password
  database: "Test" // use the specified database
});

con.connect(function(err) {
    if (err) throw err;
    // if connection is successful
   console.log('connection successful');
  });
  
// define the default route that fetches all of our notes
router.get('/', async function (req, res) {

    // data the conserves our API quota for development
    try {
        // add api call
        con.query('SELECT * FROM note', function(err,result,fields) {
            res.json({ notes: result })
        })
        
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

router.post('/add', async function (req, res) {
    // extract note text from request body
    const { note } = req.body

    const data = req.body.note

    console.log(note)

    try {
        // add api call
        con.query(`INSERT INTO note (note) VALUES ('${data}')`, function(err,result,fields){
            res.json({
                message: result
            })
        })
        
    } catch (e) {
        console.log(e)
        res.status(500).send("Error.")
    }
})

router.post('/delete', async function (req, res) {
    // extract the note id to delete from request body
    const { idnote } = req.body

    console.log(req.body)

    try {
        // add api call

        res.send('Note deleted')
    } catch (e) {
        console.log(e)
        res.status(500).send('Error.')
    }
})

module.exports = router