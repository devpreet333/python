import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///hawaii.sqlite")


# reflect an existing database into a new model
base = automap_base()
# reflect the tables
base.prepare(engine, reflect=True)

# Save reference to the table
measurement = base.classes.measurement
station = base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List of all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        
        
    )


@app.route("/api/v1.0/precipitation")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a dictionary all dates and precipitation"""
    # Query all passengers
    dic_prcp = {}
    date = []
    prcp = []
    for row in session.query(measurement.date, measurement.prcp).order_by(measurement.date.desc()):

        date.append(row.date)
        prcp.append(row.prcp)
    
    dic_prcp = dict(zip(date, prcp))

    
    session.close()

    return jsonify(dic_prcp)


@app.route("/api/v1.0/stations")
def stations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of names of stations"""
    # Query all stations
    results = session.query(station.name).all()

    session.close()

    # Create a list of station names
    all_stations = list(np.ravel(results))

    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tempertures():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of temperatures of the most active station for the last 12 months"""
    
    temp = []
    date_temp = []
    for row in session.query(measurement.date, measurement.station, measurement.tobs).order_by(measurement.date.desc()).filter(measurement.date > "2016-08-23").all():
        if row.station == "USC00519397":
            date_temp.append(row.date)
            temp.append(row.tobs)

    session.close()

    # Create a list of all tempertures
    all_temp = list(np.ravel(temp))

    return jsonify(all_temp)


if __name__ == '__main__':
    app.run(debug=True)
