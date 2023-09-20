const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());

//ROUTES//
//CREATE//
app.post("/venues",async(req, res) => {
try {
    const {
        venue_name,
        sport_name,
        event_date,
        event_time,
        capacity,
        location_venue,
        price
      } = req.body;
const newVenues = await pool.query(
    "INSERT INTO mainV(venue_name, sport_name, event_date, event_time, capacity, location_venue, price) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [venue_name, sport_name, event_date, event_time, capacity, location_venue, price]
  );
  res.json(newVenues.rows[0]);
} catch (err) {
    console.error(err.message);
}
});
// getting all values
app.get("/venues",async(req,res) => {
    try {
        const allVenues = await pool.query("SELECT * FROM mainV");
        res.json(allVenues.rows);
    } catch (err) {
       console.error(err.message) 
    }
})
// getting a particular value
{/*app.get("/venues/:id",async (req,res) => {
    try {
        const { id } = req.params;
        const mainV = await pool.query("SELECT * FROM mainV WHERE id = $1",[id])
        res.json(mainV.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})*/}
//sport-specific details
app.get("/venues/sport_name/:sport_name", async (req, res) => {
    try {
      const { sport_name } = req.params;
      const sportDetails = await pool.query(
        "SELECT * FROM mainV WHERE sport_name = $1",
        [sport_name]
      );
      res.json(sportDetails.rows);
       
    } catch (err) {
        console.error(err.message);
    }
})



app.get("/sports/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sportsByVenue = await pool.query(
      "SELECT DISTINCT sport_name FROM mainV WHERE id = $1",[id],
  
    );
    const sportsList = sportsByVenue.rows.map((row) => row.sport_name);
    res.json(sportsList);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching sports by venue" });
  }
});
///////////////////////////////////////////////////////
//New end-point for fetching sports data
app.get("/sports",async(req,res)=> {
  try {
      const allSports = await pool.query("SELECT DISTINCT sport_name FROM mainV");
      const sportsList = allSports.rows.map((row) => row.sport_name);
      res.json(sportsList);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "An error occurred while fetching sports" }); 
  }
});

  //For Venues
  app.get("/venues/:sportId", async (req, res) => {
    const sportName = req.params.sportId;
   
    try {
      const venuesBySport = await pool.query(
        "SELECT DISTINCT venue_name FROM mainV WHERE id = $1",
        [sportName]
      );
      const venueList = venuesBySport.rows;
      res.json(venueList);
      console.log(venueList)
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching venues by sport" });
    }
  });
  ////////////////////////////////for dates
  app.get("/dates/:venueName/:sportName", async (req, res) => {
    const { venueName, sportName } = req.params;
    try {
      const datesByVenue = await pool.query(
        "SELECT DISTINCT event_date FROM mainV WHERE venue_name = $1 AND id = $2",
        [venueName, sportName]
      );
      const dateList = datesByVenue.rows
      console.log(dateList)
      res.json(dateList);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching dates by venue" });
    }
  });
  
  /////////////for time
  app.get("/times/:venueName/:sportName/:eventdate", async (req, res) => {
    const { venueName, sportName, eventdate } = req.params;
    try {
      const timesByVenueAndDate = await pool.query(
        "SELECT DISTINCT event_time FROM mainV WHERE venue_name = $1 AND id = $2 AND event_date = $3",
        [venueName, sportName, eventdate]
      );
      const timeList = timesByVenueAndDate.rows
      console.log(timeList)
      res.json(timeList);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching times by venue and date" });
    }
  });
  ////For Location
  app.get("/locations/:venueName/:sportName/:eventdate/:eventtime", async (req, res) => {
    const { venueName, sportName, eventdate, eventtime } = req.params;
    try {
      const locationsByVenueDateAndTime = await pool.query(
        "SELECT DISTINCT location_venue FROM mainV WHERE venue_name = $1 AND sport_name = $2 AND event_date = $3 AND event_time = $4",
        [venueName, sportName, eventdate, eventtime]
      );
      const locationList = locationsByVenueDateAndTime.rows.map((row) => row.location_venue);
      res.json(locationList);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching locations by venue, date, and time" });
    }
  });
  ///For prices
  app.get("/prices/:venueName/:sportName/:eventdate/:eventtime/:locationVenue", async (req, res) => {
    const { venueName, sportName, eventdate, eventtime, locationVenue } = req.params;
  
    try {
      const pricesByVenueDateTimeAndLocation = await pool.query(
        "SELECT DISTINCT price FROM mainV WHERE venue_name = $1 AND sport_name = $2 AND event_date = $3 AND event_time = $4 AND location_venue = $5",
        [venueName, sportName, eventdate, eventtime, locationVenue]
      );
  
      const priceList = pricesByVenueDateTimeAndLocation.rows.map((row) => row.price);
      res.json(priceList);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ error: "An error occurred while fetching prices by venue, date, time, and location" });
    }
  });
  


/////////////////////////////////////////////////////////
//updating 
app.put("/venues/:id",async(req,res) => {
    try {
        const { id } = req.params;
        const {
            venue_name,
            sport_name,
            event_date,
            event_time,
            capacity,
            location_venue,
            price
          } = req.body;
          const updatemainV = await pool.query("UPDATE mainV SET venue_name = $1, sport_name = $2, event_date = $3, event_time = $4, capacity = $5, location_venue = $6, price = $7 WHERE id = $8",
          [venue_name, sport_name, event_date, event_time, capacity, location_venue, price, id]
          );
          res.json("updatemainV was updated!");
    } catch (err) {
        console.error(err.message);
    }
})
//deleting
app.delete("/venues/:id",async(req,res) => {
    try {
        const { id } = req.params
        const deletemainV = await pool.query("DELETE FROM mainV WHERE id = $1",[id]);
        res.json("mainV was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});


//////////////////////
//For Equipment
{/*app.post("/equipment", async (req, res) => {
    try {
      const { sport_id, equipment_name, equipment_no } = req.body;
      const newEquipment = await pool.query(
        "INSERT INTO equipment(sport_id, equipment_name, equipment_no) VALUES($1, $2, $3) RETURNING *",
        [sport_id, equipment_name, equipment_no]
      );
      res.status(200).json(newEquipment.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });*/}
  
  app.get("/equipment",async(req,res) => {
    try {
        const allVenues = await pool.query("SELECT * FROM equipment");
        res.json(allVenues.rows);
    } catch (err) {
       console.error(err.message) 
    }
})

//deleting
app.delete("/equipment/:id",async(req,res) => {
  try {
      const { id } = req.params
      const deletemainV = await pool.query("DELETE FROM equipment WHERE id = $1",[id]);
      res.status(204).send();
  } catch (err) {
      console.error(err.message);
  }
})

app.post("/equipment", async (req, res) => {
  try {
    const { sport_id, equipment_name, equipment_no, sport_name } = req.body;
    const newEquipment = await pool.query(
      "INSERT INTO equipment(sport_id, equipment_name, equipment_no, sport_name) VALUES($1, $2, $3, $4) RETURNING *",
      [sport_id, equipment_name, equipment_no, sport_name]
    );
    res.status(200).json(newEquipment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


