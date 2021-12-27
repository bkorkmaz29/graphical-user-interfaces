import Entry from './Entry';

const Entries = ({ entries, onDelete}) => {
  return (
    <div>
     {entries.map((entry, index) => (
        <Entry key={index} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default Entries
