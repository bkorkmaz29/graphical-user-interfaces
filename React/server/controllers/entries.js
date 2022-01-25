import { writeFile, readFile } from 'fs';

let user = "baran"
let date = "2021-01"

let entryRepo = {entries: []};
console.log(entryRepo.entries)
//const path = './' + user + '-' + date + '.json';
const path = `./${user}-${date}.json`
//console.log(path2);
//const path = './entries.json'

readFile(path, function (err, data) {
    if (!data)
        return;

    let json = JSON.parse(data)
    entryRepo = json
})


const readData = () =>   {
readFile(path, function (err, data) {
    if (!data)
        return;

    let json = JSON.parse(data)
    entryRepo = json
})
}

const writeEntries = () => {

    writeFile(path, JSON.stringify(entryRepo, null, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

}

export const createUser = (req, res) => {   
 
     user = req.body.user;
    
 };

export const getEntries = (req, res) => {
    
    readData();
    console.log(entryRepo.entries)
    res.send(entryRepo);
}


export const createEntry = (req, res) => {   
    const entry = req.body;

    entryRepo.entries.push(entry);
    writeEntries();
    res.send();
};

export const getEntry = (req, res) => {
    res.send(req.params.id)
};

export const deleteEntry = (req, res) => {    
    entryRepo.entries = entryRepo.entries.filter((entry) => entry.id !== req.params.id);
    writeEntries();
    res.send(console.log('Success'));
};

export const updateEntry =  (req,res) => {
    const entry = entryRepo.entries.find((entry) => entry.id === req.params.id);
    
    entry.code = req.body.code;
    entry.time = req.body.time;
    entry.description = req.body.description;
    writeEntries();
    res.send(console.log('Success'));
};

