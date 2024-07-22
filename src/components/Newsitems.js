// rce
import React, { Component } from "react";

export class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, newsurl, author, date } = this.props;
    return (
      <div className="my-4">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://imgs.search.brave.com/RgmtgVdotTetRNPsykCQsiAesWnNRuAOliq7EcNQlRY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/NTM2MjczNi9waG90/by9uZXdzLXRleHQt/Zm9yLW5ld3NsZXR0/ZXItbGF0ZXN0LW5l/d3MtYnJlYWtpbmct/bmV3cy1ibG9nLXdl/YnNpdGUtY3V0LW91/dC1wYXBlci1zcGVl/Y2gtYnViYmxlLndl/YnA_Yj0xJnM9MTcw/NjY3YSZ3PTAmaz0y/MCZjPTdvV2Nab3Nj/MVJEQmo5ZGUzMmZV/am4yUFB6UXZqeGhD/WF9OUDI0N3ZONnM9"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Unknow" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Newsitems;
