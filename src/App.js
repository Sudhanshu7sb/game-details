import React, { useEffect, useState } from "react";
import useSWR from "swr";


const fetcher = (...args) => fetch(...args).then(response => response.json());


function App() {
  const [gameTitle, setGameTitle] = useState(null);
  const [searchedGame, setSearchedGame] = useState([]);

  const { data, error } = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3', fetcher)
  const searchGame = (title) => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`).then(res => res.json()).then(data => setSearchedGame(data));

  }

  // useEffect(() => {
  //   fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`).then(res => res.json()).then(data => {console.log(data);setGameDeals(data)});
  // }, [])
  
  return (
    <div className="text-center w-[100%] ">
      <div className='searchSection flex items-center flex-col justify-center space-y-8 h-[50vh] bg-[#6B97A0]'>

        <h2 className='text-white w-[20%] text-3xl'>Search for a game</h2>
        <input placeholder="MineCraft ..." type="text" className="w-[20%] border-[1px]-black p-1 outline-none" onChange={(e) => setGameTitle(e.target.value)} />
        <button className="bg-white w-[20%] text-black font-bold" onClick={searchGame}>Search Game Title</button>
      </div>
      <div className="w-[100%] flex justify-center space-x-4">

        {searchedGame?.map((game,i) => {
          return (<div key={i} className="games w-[100px] h-[100px] flex flex-col  justify-center items-center">
            {game.external}
            <img src={game.thumb} className="w-[100px] h-[100px]" alt={game.external}/>
            {game.cheapest}
          </div>)
        })}
      </div>
      <div className='dealsSection h-[60vh]'>
        <h2 className="text-2xl font-bold">Latest Deals</h2>
        <div className="w-[100%] flex justify-center space-x-4">

        {data && data.map((game,i) => {
          return (<div key={i} className=" w-[250px] h-[250px] flex flex-col bg-teal-500 justify-center items-center text-white text-lg">
            {game.title}
            <h5>Normal Price : {game.normalPrice}</h5>
            <h5>Sale Price : {game.salePrice}%</h5>

            <h5 className="text-2xl">Savings :{game.savings.slice(0,2)}%</h5>

          </div>)
        })}
      </div>
      </div>


    </div>
  );
}

export default App;
