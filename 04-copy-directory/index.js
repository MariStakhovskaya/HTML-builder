const fs = require('fs');
const path = require('path');
          
async function deleteFolder() {
    await fs.promises.rm(path.resolve(__dirname,'files-copy'), { recursive: true });
    copyDirectory(); 
        }          

        
 fs.readdir(path.dirname(path.join(__dirname, 'files')), (err, data) => {
  
                if (err) { console.error(err.message); }
                if (data.includes('files-copy')) {
                    deleteFolder();
                } else {
                    copyDirectory(); 
                }});                
    

 function copyDirectory(){
    fs.mkdir(path.resolve(__dirname, 'files-copy'),{recursive:true}, err => {
        if (err) console.log(err);
    console.log('Папка создана')
    } );   
    fs.readdir(path.resolve(__dirname, 'files'), {withFileTypes:true}, (err,files)=> {
        if (err) console.log(err)
        else {
        files.forEach(file => {
            if (file.isFile()){
    
                fs.copyFile(path.resolve(__dirname, 'files', file.name), path.resolve(__dirname, 'files-copy', file.name), 
                err => {
                   if(err) console.log(err)
                console.log(`${file.name} is copy`)})
            }
        })
        }
    })
 }           








