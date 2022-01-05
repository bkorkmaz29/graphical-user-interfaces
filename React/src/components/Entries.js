import Entry from './Entry';
import { axios } from "axios";
import { useEffect } from "react";


const Entries = ({ entries, onAdd, onDelete}) => {
  return (
    <div class="flex flex-col w-full">
     {entries.map((entry, index) => (
        <Entry key={entry.id} entry={entry} onAdd={onAdd} onDelete={onDelete}  />
      ))}
    </div>
  )
}

export default Entries
