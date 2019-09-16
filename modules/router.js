function route (path,controllers,req,res){
    console.log(`Rounting: ${path}`);
    if(typeof controllers[path] === 'function'){
        controllers[path](req,res);
    } else {
       controllers['404'](req,res);
    }

}

exports.route = route;
