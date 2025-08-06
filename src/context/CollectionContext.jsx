import React, { createContext, useContext, useEffect, useState } from "react";

const CollectionContext = createContext();

export const useCollection = () => useContext(CollectionContext);

function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);

  // Load collection from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem("pokemon-collection");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCollection(parsed);
        console.log("📦 Loaded collection from localStorage:", parsed);
      } catch (e) {
        console.error("⚠️ Failed to parse collection:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myCollection", JSON.stringify(collection));
    console.log("🔄 Saved collection to localStorage:", collection);
  }, [collection]);

  const normalizePokemon = (pokemon) => {
    const hp = pokemon.stats?.find((s) => s.stat.name === "hp")?.base_stat ?? 0;
    const attack =
      pokemon.stats?.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
    const defense =
      pokemon.stats?.find((s) => s.stat.name === "defense")?.base_stat ?? 0;
    const image = pokemon.sprites?.other?.["official-artwork"]?.front_default;

    return {
      name: pokemon.name,
      types: pokemon.types?.map((t) => t.type.name) ?? [],
      stats: { hp, attack, defense },
      image,
    };
  };

  const addToCollection = (pokemon) => {
    const normalized = normalizePokemon(pokemon);
    const updated = [...collection, normalized];
    setCollection(updated);
    localStorage.setItem("pokemon-collection", JSON.stringify(updated));
    alert(`${pokemon.name} added to collection ✅`);
  };

  const toggleCollection = (pokemon) => {
    const exists = collection.some((p) => p.name === pokemon.name);

    if (exists) {
      const updated = collection.filter((p) => p.name !== pokemon.name);
      setCollection(updated);
      localStorage.setItem("pokemon-collection", JSON.stringify(updated));
      alert(`${pokemon.name} removed from collection ❌`);
    } else {
      const hp =
        pokemon.stats?.find((s) => s.stat.name === "hp")?.base_stat ??
        pokemon.stats?.hp ??
        0;
      const attack =
        pokemon.stats?.find((s) => s.stat.name === "attack")?.base_stat ??
        pokemon.stats?.attack ??
        0;
      const defense =
        pokemon.stats?.find((s) => s.stat.name === "defense")?.base_stat ??
        pokemon.stats?.defense ??
        0;

      const newPokemon = {
        name: pokemon.name,
        image:
          pokemon.sprites?.other?.["official-artwork"]?.front_default ||
          pokemon.image,
        types: pokemon.types?.map((t) => t.type?.name || t) || [],
        stats: { hp, attack, defense },
      };

      const updated = [...collection, newPokemon];
      setCollection(updated);
      localStorage.setItem("collection", JSON.stringify(updated));
      alert(`${pokemon.name} added to collection ✅`);
    }
  };

  const removeFromCollection = (name) => {
  const updated = collection.filter((p) => p.name !== name);
  setCollection(updated);
  localStorage.setItem('pokemon-collection', JSON.stringify(updated));
   alert(`${name} removed from collection`);
};


  const reorderCollection = (newOrder) => {
    setCollection(newOrder);
  };

  return (
    <CollectionContext.Provider
      value={{
        collection,
        addToCollection,
        removeFromCollection,
        reorderCollection,
        toggleCollection
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export { CollectionProvider };
