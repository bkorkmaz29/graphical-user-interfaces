import Entry from './Entry';



const Entries = ({ entries, onAdd, onUpdate, onDelete}) => {
  return (
    <div className="flex flex-col w-full">
     {entries.map((entry, index) => (
        <Entry key={entry.id} entry={entry} onAdd={onAdd} onUpdate={onUpdate} onDelete={onDelete}  />
      ))}
    </div>
  )
}

export default Entries
