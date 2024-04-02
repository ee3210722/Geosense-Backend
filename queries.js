require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

const getData = (req, res) => {
  pool.query("select * from sensordata", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getLocations = (req, res) => {
  pool.query("SELECT ROW_NUMBER() OVER (ORDER BY latitude, longitude) AS id, sid, latitude, longitude FROM sensordata GROUP BY sid, latitude, longitude;", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getDataByDate = (req, res) => {
  const date = req.params.date;

  pool.query("select * from sensordata where to_char(datetime, 'dd-mm-yyyy')=$1 order by datetime", [date], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getDataByDateAndLocation = (req, res) => {
  const date = req.params.date;
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;

  pool.query("select * from sensordata where to_char(datetime, 'dd-mm-yyyy')=$1 and latitude=$2 and longitude=$3 order by datetime", [date, latitude, longitude], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};


module.exports = {
  getData,
  getLocations,
  getDataByDate,
  getDataByDateAndLocation
}