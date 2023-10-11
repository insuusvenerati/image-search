import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import "./App.css";
import { Image } from "./components/Image";
import { searchPhotos } from "./models/unsplash.model";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchPhotos(searchQuery),
    enabled: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      refetch();
    }
  };

  return (
    <>
      <h1>Unsplash Search</h1>
      <input
        onKeyUp={handleKeyPress}
        onChange={handleChange}
        type="text"
        name="search"
        placeholder="Search"
      />
      <button onClick={() => refetch()} type="button">
        Search
      </button>
      <div className="container">
        <div className="grid">
          {data?.results.map((photo) => (
            <Image src={photo.urls.small} key={photo.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
