import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../index.css";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 20,
  },
  media: {
    height: 240,
  },
});

const Movie = ({ movie }) => {
  const [show, setShow] = useState(false);

  const handleChange = () => {
    setShow((prevState) => !prevState);
  };

  const classes = useStyles();
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={poster}
          title={`The movie titled: ${movie.Title}`}
          onClick={handleChange}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.Year}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleChange}>
          More Detail
        </Button>
      </CardActions>
      {show && (
        <div className="detail-mov">
          <div className="Modal">
            <div className="head-modal">
              <h5>Movie {movie.Title}</h5>
              <button onClick={handleChange}>X</button>
            </div>
            <div className="body-modal">
              <div className="data-list">
                <div className="img_data">
                  <img src={poster} />
                </div>
                <div className="body-data">
                  <span>{movie.Title}</span>
                  <h6>{movie.Year}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Movie;
