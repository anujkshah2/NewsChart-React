// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import InfiniteScroll from 'react-infinite-scroll-component';


// export default class Home extends Component {
//   constructor() {
//     super()
//     this.state = {
//       articles: [],
//       totalResults: 0
//     }
//   }
//   getAPIData = async (query = 'All') => {
//     // let query = this.props.search?this.props.search:this.props.q
//     // let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`)
//     let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&page=1&pageSize=12&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`)
//     response = await response.json()
//     this.setState({
//       articles: response.articles.filter((item) => item.title !== "[Removed]"),
//       totalResults: response.totalResults
//     })
//   }
//   fetchData =async()=>{
//     this.setState({page:this.state.page+1})
//     let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&page=1&pageSize=12&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`)
//     response = await response.json()
//     this.setState({
//       articles: this.state.articles.concat(response.articles.filter((item) => item.title !== "[Removed]")),
//       totalResults: response.totalResults
//     })
//   }
  
//   componentDidMount() {
//     this.getAPIData()
//   }
//   componentDidUpdate(old) {
//     if (this.props !== old) {
//       if (this.props.search === "" || this.props.search === old.search)
//         this.getAPIData(this.props.q)
//       else {
//         this.getAPIData(this.props.search)
//       }

//     }

//   }
//   render() {
//     return (
//       <div className='container-fluid'>
//         <h5 className='background p-2 text-light text-center my-2'>{this.props.q} News Articles</h5>
//         <InfiniteScroll
//           dataLength={this.state.articles.length} //This is important field to render the next data
//           next={this.fetchData}
//           hasMore={this.state.articles.length<this.state.totalResults }
//           loader={<h4>Loading...</h4>}>
//         <div className="row">
//           {
//             this.state.articles.map((item, index) => {
//               return <NewsItem
//                 key={index}
//                 pic={item.urlToImage}
//                 title={item.title}
//                 description={item.description}
//                 url={item.url}
//               />
//             })
//           }


//         </div>
//       </InfiniteScroll>
//       </div >
//     )
//   }
// }



import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0,
      page:1,
      query:""
    }
  }
  getAPIData = async (query='All') => {
  this.setState({query:query})
    // let query = this.props.search?this.props.search:this.props.q
    // let response = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`)
    let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&language=${this.props.language}&sortBy=publishedAt&apiKey=301c5411d2c14378ae6c68c0ff399326`)
    response = await response.json()
    this.setState({
      articles: response.articles.filter((item)=>item.title!=="[Removed]") ,
      totalResults: response.totalResults
    })
  }
  componentDidMount() {
    this.getAPIData()
  }
  componentDidUpdate(old){
    if(this.props!==old){
      if(this.props.search==="" || this.props.search===old.search)
      this.getAPIData(this.props.q)
    else{ 
      this.getAPIData(this.props.search)
    }
    
    }
    
  }
  render() {
    return (
      <div className='container-fluid'>
        <h5 className='background p-2 text-light text-center my-2 text-capitalize'> results for {this.state.query} News Articles</h5>
        <div className="row">
          {
            this.state.articles.map((item, index) => {
              return <NewsItem 
                        key={index}
                        pic = {item.urlToImage} 
                        title = {item.title}
                        description = {item.description}
                        url = {item.url}
                      />
            })
          }
        </div>
      </div>
    )
  }
}
