function connect(publisher,extension_name,version){
    var s="https://"+publisher+".gallery.vsassets.io/_apis/public/gallery/publisher/"+publisher+"/extension/"+extension_name+"/"+version+"/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage"
    console.log(s);
}

//connect("formulahendry","code-runner","0.9.3");

//connect("Compulim","vscode-express","0.0.5");

//connect("formulahendry","vscode-mysql","0.3.0");

//connect("formulahendry","auto-close-tag","0.5.6");

//connect("donjayamanne","jquerysnippets","0.0.1");

// connect("abusaidm","html-snippets","0.2.1");

// connect("ecmel","vscode-html-css","0.2.0");

// connect("christian-kohler","npm-intellisense","1.3.0");

// connect("eg2","vscode-npm-script","0.3.3");

// connect("IBM","output-colorizer","0.1.2");

// connect("PKief","material-icon-theme","3.3.0");

// connect("robertohuertasm","vscode-icons","7.22.0");

// connect("dracula-theme","theme-dracula","2.9.0");


connect("mikey","vscode-fileheader","0.0.2");   

connect("CoenraadS","bracket-pair-colorizer","1.0.27");   
