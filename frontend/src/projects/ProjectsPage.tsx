import React from "react"
import BookList from "./Booklist"
import SearchBar from "./SearchBar"
import ReccButton from "./ReccButton"
import { useState,useEffect } from "react"
// MAIN PAGE

//https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11&key=AIzaSyCOeK3OAiQpxV7CaTPE-FAhDdI0fAFrzSA

//


  interface Book {
    title: string;
    author: string;
    isbn: string;
    pictureurl: string;
  }


function ProjectsPage() {
    const [books,setBooks] = useState<Book[]>([]);
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    useEffect(() => {
        // Define the URL of your API endpoint
        const apiUrl = 'http://localhost:8080/sessions/'; // Replace with your actual API URL
    
        // Fetch data from the API and update the books state
        fetch(apiUrl, {
            method: 'GET', // Replace with your desired HTTP method
            credentials: 'include', // Include credentials (cookies) in the request
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setBooks(data);
            console.log(data) // Update the books state with the fetched data
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
          setSearchButtonClicked(false);
      }, [searchButtonClicked]);
    
  // Function to handle search button click
  const handleSearchButtonClick = () => {
    console.log(books)
    setSearchButtonClicked(true); // Set searchButtonClicked to true when the button is clicked
  };



    return (
    <div className="bg-white flex h-4/5 mt-4 w-4/5 m-auto">
        <div className="w-2/5 border border-yellow-500 bg-black overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-track-yellow-500">
            <SearchBar onSearchButtonClick={handleSearchButtonClick}/>
            <BookList bookitems={books}/>
        </div>
        <div className="w-3/5 bg-black">
            <ReccButton/>   
        </div>
        <div></div>
    </div>)




}

export default ProjectsPage