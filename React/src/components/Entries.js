import Entry from './Entry';


const Entries = ({ entries, onAdd, onDelete}) => {
  return (
    <div>
     {entries.map((entry, index) => (
        <Entry key={entry.id} entry={entry} onAdd={onAdd} onDelete={onDelete}  />
      ))}
    </div>
  )
}

export default Entries
