import React, { useState, useEffect } from 'react';
import '../../index.css';
const Home = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [searchParams] = useState(["capital", "name"]);
    const [filterParam ,setFilterParam] = useState(['All'])

    useEffect(() => {
         fetch("https://restcountries.eu/rest/v2/all")
                .then((res) => res.json())
            .then(result => {
                setIsLoaded(true);
                setItems(result)

            }, (error) => {
                console.log(error)
                setError(error)
                setIsLoaded(true);
            })


    }, [])


    // This function takes in our fetched items and returns all the items that match anything in our searchParam array if the indexOF() is > -1.
    function searchs(items) {
        return items.filter(item => {
            if (item.region == filterParam) {
                return searchParams.some(newItem => {
                    return (
                    
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(search.toLowerCase()) > -1
                    )

                })
            } else if (filterParam == 'All') {
                return searchParams.some(newItem => {
                    return (
                        item[newItem]
                        .toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                   )
                })
            }
        })
    }
    
    const isError = () => error && (<div>Error: {error}</div>)
    const isLoading = () => !isLoaded && (<div>Loading...</div>);
    const searchFilter = () => {
        return (
            <>
            <div className="select"> 
                    
                <select
                     onChange={(e) => {
                    setFilterParam(e.target.value);
                    }}
                    className="custom-select"
                    aria-label="Filter Countries By Region">
                        <option value="All">Filter By Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        </select>
                    <span className="focus"></span>
                </div>
                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                id="search-form"
                                placeholder="Search for..."
                                value={search}
                                className="search-input"
                                onChange={(e)=> setSearch(e.target.value)}
                            
                            />
                            <span className="sr-only">Search countries here</span>
                        </label>
                        </div>
                </>
        )
    }
 
    const allItems = () => (
        items && searchs(items).map((item, i) => (

            <li>

                <article className="card" key={item.callingCodes}>
                    <div className="card-image">
                        <img src={item.flag} alt={item.name}/>
                    </div>
                    <div className="card-content">
                        <h2 className="card-name">{ item.name}</h2>
                        <ol className="card-list">
                            <li>
                                population: {" "}
                                 <span>{item.population}</span>
                            </li>
                            <li>Rigion: {item.rigion} </li>
                            <li>Capital: { item.capital}</li>
                        </ol>
                    </div>
                </article>
                </li>
        ))
    )
    return (
        <div className="container">
            <div className="row">
            <div className="wrapper">
            {isError()}
            {isLoading()}
               
                        {searchFilter()}
                
   
                      
                <ul className="card-grid">
                {allItems()}
                </ul>
               </div>

            </div>
            
        </div>
    );
}

export default Home;
