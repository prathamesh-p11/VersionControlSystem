Create Repository

Class Number: CECS 543
Project Name: VCS Project 1  Create Repository
Team name: JPX
Team members: Jun Li and Prathamesh Patil
Intro: Create a repository for the given project source tree (including all its files and their folder paths) within the project.

Contents:

1. /mypt		Files used for demonstration
2. /mypt2		Files used for demonstration
3. index.html		Frontend HTML
4. package.json		Required package information and script command
5. package-lock.json 	Required package information
6. README.txt		Readme file
7. utils.js		Helper functions
8. .gitignore		Ignore files to commit in git

External requirements:
Node.js

Our development environment:
Ubuntu     18.04 LTS
Node.js     v10.16.3

Setup and Installation:

i)Open terminal in the directory of the project, install the required package by typing (this command will install all the required dependencies)
        npm install

ii)Wait for sections, after installation completed, run the project by typing in terminal
        npm start

iii)Open browser (Chrome), type localhost:3000 in the address bar, now it's ready to type commands to test the project.


Sample invocation & results
1. Ex1- Type following command in the text field:
    		CR mypt tar
All files under /mypt folder will stash in /tar folder, and records with timestamp will be stored in /tar/manifest.txt

/tar
	/mypt
		/hx.txt
			/3762-L5.txt

2. Ex2- Type following command in the text field:
        CR mypt2 tar
All files under /mypt2 folder will stash in /tar folder, and records with timestamp will be stored in /tar/manifest.txt
/tar
      /mypt2
		/hx.txt/3762-L5.txt
		/Stuff
			/goodbye.txt/3579-L8.txt
			/Hello.txt/7590-L11.txt
    		manifest.txt

Press Ctrl + c in terminal to stop the project.

Feature/Task
Work breakdown structure(WBS) :

1.Index.js
	1.1 Initiate express and listen on port 3000 on front end page index.html
	1.2  Get user command from Index.html

2. Index.html
	2.1 Accept user create repository command with source and target folder names

3.  utils.js
	3.1 Read file and generate Artifact ID
	3.2 Create folder in target repository
	3.3 Generate manifest file


Bugs
    No bugs found so far.

Node.js:
Windows installation:
1. Download the Node.js installer from this site https://nodejs.org/en/download/ (.msi for Windows).
2. Open the downloaded setup file accept license agreement and the click next to continue.
3. Choose the location where Node.js needs to be installed and then click on the Next button.
4. In the next screen accept the default components (Node.js runtime and Node Package Manager (npm)) and click next to continue.
5. Click install button to start installation.

Linux installation:
1. Step 1 Add Node.js PPA using following commands:
    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
2. Execute the below command install Node on and Ubuntu using apt-get. This will also install NPM with node.js. This command also installs many other dependent packages on your system.
    sudo apt-get install nodejs
3.Check Node.js and NPM Version
    node -v

MacOS installation:
1. Download the Node.js installer from this site https://nodejs.org/en/download/ (.pkg for macOS).
2.When the file finishes downloading, locate it in Finder and double-click on it.
3.Go through the entire installation process.
4.When installation is finished enter node -v in terminal to verify Node.js is installed correctly and to see the version of Node.js that was installed.


Progress List:

	
Task:						
Work done by: 
Verified by: 

1. Task: Setup development environment
Work done by: Jun Li and Prathamesh Patil on 09/13/2019
Verified by: Jun Li and Prathamesh Patil on 09/13/2019


2. Task: HTML page for user command input					
Work done by:Prathamesh Patil 09/13/2019
Verified by: Jun Li and Prathamesh Patil on 09/13/2019 

3. Task: Checksum function and Design Rest API				
Work done by: Jun Li and Prathamesh on 09/13/2019
Verified by: Prathamesh Patil 09/16/2019

4. Task: ArtifactId function, stashFile and stashDir function
Work done by: Jun Li on 09/16/2019
Verified by: Prathamesh Patil 09/16/2019

5. Task: Express index.js, listen port 3000					
Work done by: Jun Li on 09/16/2019 
Verified by: Prathamesh Patil on 09/16/2019

6. Task: README.txt 						
Work done by: Jun Li and Prathamesh 09/20/2019
Verified by: Jun Li and Prathamesh 09/20/2019
