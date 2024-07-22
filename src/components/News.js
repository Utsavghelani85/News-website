import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News App`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    this.props.setProgress(10);
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(90);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, this.fetchNews);
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 }, this.fetchNews);
  };

  fetchMoreData = async () => {
    const apiKey = process.env.REACT_APP_NEWS_API;
    this.setState({ page: this.state.page + 1 }, async () => {
      const { country, category, pageSize } = this.props;
      const { page, articles } = this.state;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitems
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
