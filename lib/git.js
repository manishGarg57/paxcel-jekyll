var infoToRender = require("./infoToRender.js");
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;
var GitHubApi = require('github');
var chalk = require('chalk');
var file = require('./file.js');
var githubOptions = {
  version: '3.0.0'
};
var github = new GitHubApi(githubOptions);

var git = module.exports;

git.pushToGit = function pushToGit(callback){
  this.githubAuth(infoToRender.githubUserName,infoToRender.githubPassword);
		github.repos.create({
		name: infoToRender.githubRepoName
},function(err,res){
	if (err){
		console.log(chalk.red("\nError creating new repository : "+err));
		if(err.message == "Bad credentials"){
			console.log(chalk.red("Either username or password is incorrect."));
		}
		else if(err.message == "Validation Failed" ){
			console.log(chalk.red("Repository already exists!\nPlease use a different repository name."));
		}
		process.exit(1);
	}
	else{
		console.log(chalk.green("\nNew repository created: "+infoToRender.githubRepoName));
	}
	execSync('git init'); 
	execSync('git config core.autocrlf true');
  	execSync('git add .');
  	execSync('git commit -m "Initial_commit"');
  	execSync('git remote add origin https://github.com/'+infoToRender.githubUserName+'/'+infoToRender.githubRepoName+'.git');
	execSync('git branch gh-pages');
	console.log(chalk.yellow("\nPlease enter your Github username and password again."));
	execSync('git push origin gh-pages');
	console.log(chalk.green("\nEverything done : You site is now live on "));
	console.log(chalk.yellow(infoToRender.githubUserName + ".github.io/" + infoToRender.githubRepoName));
	//for windows open browser 
	//	execSync('start chrome'+infoToRender.githubUserName + '.github.io/' + infoToRender.githubRepoName);
	if(typeof callback  === "function"){
          callback(null);
      };
});
};

git.githubAuth = function githubAuth(username,password){
	github.authenticate({
		type: "basic",
		username: username,
		password: password
});
};
git.fetchFromGithub = function pullFromGit(callback) {
  	//execSync('git clone https://github.com/manishGarg57/agency-jekyll-theme.git templates');
	  exec('git clone https://github.com/manishGarg57/agency-jekyll-theme.git '+file.sourceRootPath(),function (error, stdout, stderr) {
		  	console.log('stdout: ' + stdout);
		    console.log('stderr: ' + stderr);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
			   if(typeof callback  === "function"){
				   console.log("aaa");
          callback(null);
      };

	  });
  /*
  mkdir repo
cd repo
git init
git remote add origin https://github.com/manishGarg57/agency-jekyll-theme.git
git fetch --all

or
git clone https://github.com/manishGarg57/agency-jekyll-theme.git templates
   */

   
};