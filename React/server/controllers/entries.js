import { writeFile, readFile } from 'fs';


let entryRepo = { entries: [] };
let a = new Date();

let month = a.toISOString().split('T')[0].slice(0, -3);

const readData = (user, month) => {
    
    const path = `./db/${user}-${month}.json`
        readFile(path, function (err, data) {
            if (err) return;
            const json = JSON.parse(data)
            entryRepo = json

        })
}

const writeData = (user, month) => {
    const path = `./db/${user}-${month}.json`;

    readFile(path, function (err, data) {
        writeFile(path, JSON.stringify(entryRepo, null, 2), (err) => {
            readFile(path, function (err, data) {;
            });
        });
    });

}


export const getEntries = (req, res) => {
    readData(req.params.user, req.params.month);
  
    res.send(entryRepo);
}


export const createEntry = (req, res) => {
    const entry = req.body;
     if(req.params.month !== month) {
         entryRepo.entries = [];
         month = req.params.month;
     } 

    entryRepo.entries = [...entryRepo.entries, entry];

    writeData(req.params.user, req.params.month);
};

export const getEntry = (req, res) => {
    res.send(req.params.id)
};

export const deleteEntry = (req, res) => {
    entryRepo.entries = entryRepo.entries.filter((entry) => entry.id !== req.params.id);
    writeData(req.params.user, req.params.month);
};

export const updateEntry = (req, res) => {
    const entry = entryRepo.entries.find((entry) => entry.id === req.params.id);

    entry.code = req.body.code;
    entry.subcode = req.body.subcode;
    entry.time = req.body.time;
    entry.description = req.body.description;
    writeData(req.params.user, req.params.month);
    res.send(console.log('Success'));
};

