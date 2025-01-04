// sort functions
const sortByDate = (a, b) => {
    return a.date - b.date;
};

function sort (arr) {
    let dateDict = [];

    for (let i = 0; i < arr.length; i++) {
        // month day year
        const dateArr = arr[i].split('_')[1].substring(0,8).split('-');
        // year month day
        const date = new Date(`20${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`)

        // put a dictionary in and array
        dateDict.push({ name: arr[i], date: date });
    }

    // sort the array of dictionary
    dateDict.sort(sortByDate);
    
    // get only the names
    let sortedWorlds = [];
    dateDict.forEach(world => sortedWorlds.push(world.name));

    sortedWorlds.reverse();

    return sortedWorlds;
}

// creates a download button for the world
function createButton (backupName, serverName) {
    const tempA = document.createElement('a');

    tempA.href = `${serverName}/${backupName}`;
    tempA.setAttribute('download', '');
    tempA.classList.add('worlds');
    tempA.innerHTML = backupName.split('.')[0].replace('_', ' ');

    return tempA;
}


// fetch the names of the folders from the server and create the buttons
function createButtons (serverName, divName, callbackButtonId, callback) {
    let archivedDiv = document.getElementById(divName);
    
    fetch(`/api/${serverName}`)
        .then(response => response.json())
        .then(backups => {
            // sort the names
            backups = sort(backups);
            
            // create a button for each of the names
            backups.forEach(backup => 
                archivedDiv.append(createButton(backup, serverName)));

            callback(archivedDiv, callbackButtonId);
        });
    }
    
    // creates the latest backup button
function createLatestButton (archivedDiv, buttonId) {
    let button = document.getElementById(buttonId);
    newestBackup = archivedDiv.children[1];

    button.href = newestBackup.href;
    button.innerHTML = newestBackup.innerHTML;
}
