import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  // articles=[
  //     {
  //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //       "author": null,
  //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //       "publishedAt": "2020-04-27T11:41:47Z",
  //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //     },
  //     {
  //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //       "author": null,
  //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //       "publishedAt": "2020-03-30T15:26:05Z",
  //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //     }
  //   ]
  capatalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("hello i am constructor from news components ");
    this.state = {
      //    articles:this.articles,
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capatalise(this.props.category)} -NewsMonkey`;
  }

  async updatenews() {
    this.props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setprogress(30);
    let parseddata = await data.json();
     this.props.setprogress(70);
    //    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setprogress(100);
  }
  async componentDidMount() {
    //    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=71d7b418306e43af9f34aa24480ed01e&page=1&pageSize=${this.props.pagesize}`
    //    this.setState({loading:true})
    //    let data= await fetch(url);
    //    let parseddata =await data.json()
    // //    console.log(parseddata);
    //    this.setState({articles:parseddata.articles,
    //     totalResults:parseddata.totalResults,
    //     loading:false
    // })
    this.updatenews();
  }
  // handlenextclick = async () => {
  //     //     if(!(this.state.page+1 >Math.ceil(this.state.totalResults/this.props.pagesize))){
  //     //      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=71d7b418306e43af9f34aa24480ed01e&page=${this.state.page+1}&pageSize=${this.props.pagesize}`
  //     //      this.setState({loading:true})
  //     //        let data= await fetch(url);
  //     //        let parseddata =await data.json()
  //     //     //    console.log(parseddata);
  //     //     this.setState(
  //     //         {
  //     //             page:this.state.page+1,
  //     //             articles:parseddata.articles,
  //     //             loading:false
  //     //         }
  //     //     )
  //     // }
  //     this.setState({
  //         page: this.state.page + 1,
  //     });
  //     this.updatenews();
  // };
  // handlepreviousclick = async () => {
  //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=71d7b418306e43af9f34aa24480ed01e&page=${this.state.page-1}&pageSize=${this.props.pagesize}`
  //     //  this.setState({loading:true})
  //     //    let data= await fetch(url);
  //     //    let parseddata =await data.json()
  //     // //    console.log(parseddata);
  //     // this.setState(
  //     //     {
  //     //         page:this.state.page-1,
  //     //         articles:parseddata.articles,
  //     //       loading:false

  //     //     }
  //     // )
  //     this.setState({
  //         page: this.state.page - 1,
  //     });
  //     this.updatenews();
  // };
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    
    let data = await fetch(url);
    let parseddata = await data.json();
    //    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          News monkey-Top {this.capatalise(this.props.category)} Headlines
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
              {/* {!this.state.loading && */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={element.title ? element.title.slice(0, 45) : " "}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark"
                onClick={this.handlepreviousclick}
              >
                {" "}
                &larr; Previous
              </button>
              <button
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalResults / this.props.pagesize)
                }
                type="button"
                className="btn btn-dark"
                onClick={this.handlenextclick}
              >
                Next &rarr;
              </button>
            </div> */}
      </>
    );
  }
}

export default News;
