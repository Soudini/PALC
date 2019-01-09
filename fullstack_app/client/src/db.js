import axios from "axios";



export default searchDataFromDb = (query) => {
    axios.post("/api/searchData", query)
      .then(data => data.data).then(res => {this.setState({ data: res.data })});

  }
