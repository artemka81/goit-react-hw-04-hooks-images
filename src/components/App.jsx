import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';




export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    console.log('APP searchQuery: ', searchQuery);

  }


  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer />
    </>
  );
}










// export default class App extends Component {
//   state = {
//     searchQuery: "",
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchQuery={this.state.searchQuery} />
//         <ToastContainer />
//       </>
//     );
//   }
// }
