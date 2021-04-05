#Version Control System

Class Number    : CECS 543
Project Name    : VCS Project 2 - Check-Out, Check-In, List, & Label
Team name       : JPX
Team members    : Jun Li, Prathamesh Patil
Intro           : Check-Out, Check-In, List, & Label features of VCS


*The VCS repository holds copies of all artifacts (i.e., all versions) of each file of a project “under configuration control”. A file name alone is not sufficient to distinguish between several of its artifacts/versions; hence, within the VCS repository we will use a code name for each artifact and will
put all the artifacts of a particular file in a folder, and that folder is named using the original file's name.*

##Part 1 : Create Repository

###Use Case Title: Create Repository
**Tag-line**: Create a repository for the given project source tree (including all its files and their folder paths) within the project.
**Summary**: The user needs to keep track of various snapshots of their project. (OTOH, different projects should be kept in different repositories.) Each project source tree snapshot includes the currentstate of each file in their project tree at  that specific moment during project development. In order to keep track of each snapshot, we create a repository (repo) in the given target folder and copy a snapshop of the source tree from the given project source tree root folder. The entire project source tree folder (including its root folder) is replicated within (and immediately under) the target repository root folder.
Additionally, on creation of the repository, a snapshot manifest (i.e., a snapshot summary) for this command is created listing the command particulars (i.e., the “command line” used), the date and time of the command, and for each project source file a line describing that source file (AKA that artifact) in the project source tree along with its project folder's relative path. Because we expect, eventually, to store more than one artifact of each project file within the project's VCS repository, we put the artifact (the source file snapshot) of a file under a new (non-project) leaf folder, where the leaf folder is given the file's name and the artifact gets an artifact ID (a code name). Note the contents of the artifact file is the same as its corresponding project source file snapshot. The leaf folder appears in the repository in same relative position as its corresponding file appears in the project source folder. The artifact ID
format is described below.

**Simplifying assumptions**:
1. All files in the project tree (ptree) will be included. (No exception, no black-list.)
2. No frills: You may ignore user input mistakes.
3. A file artifact will consist of the full file contents. (No deltas/no diffs.)
4. The repo will include the entire ptree folder hierarchy, including its root folder.
5. Each ptree file will get a “leaf” folder of the same name to hold that file's artifacts – initially
just the first artifact (snapshot of that file). Thus, if ptree folder xcp/ has two files fred.c and
jack.c, the repo will have folder xcp/ as well as leaf sub-folders fred.c/ and jack.c/ – where leaf
folder fred.c/ will contain all that ptree file's fred.c artifacts and leaf folder jack.c/ will contain
all that ptree file's jack.c artifacts.
6. We will create an artifact ID (ArtID) code name as discussed below, for each file snapshot.
7. The artifact (file version) that is in a leaf folder gets named by it's ArtID code name.
8. Assume that both given source and empty target folders exist, and that disk space is adequate.
9. A command-line interface within a web page (e.g., edit boxes & “Create” button) is sufficient.


### Artifact ID (ArtID) code names
**Weighted checksum**: The code name will be a rolling multi-byte weighted checksum of all the
characters (bytes) in the file followed by a hyphen and an “L” and the integer file size, followed by the
file's extension. The weights by which each character in a group are multiplied are 1, 7, 3, 7, and, 11.

```
Thus, if the file contents is "HELLO WORLD", the checksum S is:

S = 5478 = 1*H + 3*E +7*L +11*L + 13*O + 1*' ' + 3*W + 7*O + 11*R + 13*L + 1*D

and the file size is 11. 
```

(Note, the ASCII numeric value of each character is used and we indicated the
space character by ' '.) 
For this version of the source file fred.txt, the AID code name would be “5478-L11.txt”, in a leaf folder named “fred.txt”.

**Modulus**: Because the sum can get rather large for a big file, make sure the sum never gets too large by wrapping it using the following prime modulus operator: 
m == (2^31) - 1 == 2,147,483,647.




##Part 2 : Check-Out, Check-In, List, & Label

###Label Command
The labeling feature allows the user to associate a label (a text string) with a given manifest file, in order to make it easier for the user to remember and identify a particular project-tree snapshot when issuing commands to our VCS. The user should be able to associate at least four different labels to any given manifest file. (More is okay.) We can presume that the user is nice and always supplies a unique label so we don't have to check for the label already existing in some other manifest file. A
label is supposed to uniquely identify a manifest file. We can also assume that a label (a string) is at
most only 30 characters long. (But you can handle longer labels if you wish.) To add a label to a manifest file, the user uses a Label command, and along with a label string argument he/she must also specify the VCS repository location and either the target manifest's filename or an existing label that is
already associated with that manifest. Once a manifest is labeled, the user can refer to the manifest by
that label name in any other VCS commands in place of using a manifest name.

###Check-Out Command
The check-out ability lets a user recreate a specific version (snapshot) of the project tree. They do this by selecting a particular manifest file in the repo, as an argument. Of course, a manifest file specifies every version of every file from a particular version of a project tree. Note that a given repo
folder only deals with one project (e.g., snapshots only for the Skyrocket project, or the Red-Bunny project, or the Halo project), but the repo can contain many versions (snapshots) of that one project. A snapshot can be created by anyone who has previously checked out a version of that project (but you do
not have to verify this). On check-out, the recreated project tree is installed in an empty folder, which the user also selects as a second argument. We can assume that the target folder is empty. The checkout command also creates a new manifest file, of the checked out version, in the repo. The user should
be able to specify the manifest file using a label, if it has one.

###Check-In Command
The check-in ability lets the user update the repository (repo) with new version (snapshot) of a project tree for this repo. This means the VCS must add into the repo all changed files from the source project tree. So, each check-in is a (potentially different "version" of the project tree, and you create
for it a new manifest file. This allows the user to track the modification history from a given project tree back, through various project versions, all the way to the repo's creation; by examining the repo's manifest files. Note that we assume labels are forever (the user doesn't remove a label). The user's
folder containing a version of the project tree that the user specifies as an argument to the check-in command should have earlier been the target of a check-out command (or was the original create-repo project tree folder), and we will assume that this is always true. Therefore, in the repo's manifest files, we can trace from a given check-in (from a user's folder) back to the original check-out into that user's folder from a snapshot of some other user's project tree in some other folder, etc., all the way back to the original create-repo command. Note that your manifest files should reflect this ability, as it will be needed later. Also, note, a given repo only contains project-tree snapshots of a single project, which might be being worked on by several project members, each with one or more project-trees of their own.

###Listing Command
This may not need to be a command. You should display the existing manifest file names and their
labels. If the list is too large for the display, you should display a portion of the list. (Whether paging
or scrolling or some other method is up to you.)



##Part 3 : Merge

In this project part, we add the ability to merge two project tree snapshots (that are based on the same repo, and hence the same development team project). Note that we already have a natural branching effect due to check-out (of a project snapshot, AKA the Kid) coupled with tracking that project version's parent snapshot (AKA the Mom, as identified in the Kid's
repo manifest).
This merge ability is typically used to merge two snapshots that have different modifications (usually in different parts/files), or to merge a branch snapshot of modifications (e.g., a bug fix, or a new feature) back into a project mainline's snapshot.

We will do the merge in two parts: 
* merge-out
* merge-in. 

The merge-out command will gather the information needed for the user to manually do a 3-way merge. (Sorry, user, but this is a somewhat no-frills VCS.) 
The merge-in command will complete the merge by "checking in" a snapshot of the user's fully-merged project tree – the user did the full-merge by hand (again, no frills).

Also, note that our VCS is project-based, not file-based. We do not run a VCS command to copy an individual file to/from the repo, but instead only to copy an entire project tree (which resides outside the repo directory) to/from the repo (where “to repo” is taking a snapshot and “from repo” is recreating
a new project tree from a snapshot).

###Source & Target
The merge-out arguments are a repo source snapshot and a target project tree (actually that target's latest snapshot, from which we can extract the location of the target project tree). The source snapshot is the repo 'R' snapshot. The Target 'T' snapshot is assumed to be a snapshot that the user has just checked-in (sorry, user, you do it, no-frills). The Target project tree is in the user's project folder from which the T snapshot was (just) checked-in. The merge-out will (maybe) add new files/folders to the T project tree.

###Merge File Collisions
These new files will include those in the Source that don't match (don't have the same artifact ID) as their corresponding target files – called collision files. Because we are merging an entire project tree, there may be many collision files for one merge-out command. When we detect that one of the many project snapshot files collides (has a different artifact ID) with the corresponding file of the other snapshot, we will add both files to the target project tree. The mismatching file from the repo source snapshot will be added, but with a suffix of “_MR” meaning “Mismatch-from-Repo”. The corresponding file from the target snapshot will have its filename suffixed with “_MT” meaning
“Mismatch-in-Target”. Both files will retain their existing extensions (e.g, “fred_MR.java” and “fred_MT.java”). Also, a third corresponding file, the “_MG” file will be added to the target project tree; the “grandma” file.
Also, (optionally) the merge-out command will create a manifest file which includes the command and arguments, and the name of the “grandma” snapshot.

###Grandma
In case of at least one file collision, you will need to find the “grandma” snapshot of the source and target snapshots. This is the most recent common ancestor snapshot. The “grandma” snapshot is the same for all pairs of colliding files. That Grandma 'G' snapshot is determined by the path of immediate ancestor snapshots from a given (R or T) snapshot back to the root of the repo snapshot directed acyclic graph (DAG). The 'G' file will get its own suffix “_MG” meaning “Mismatch-from-Grandma” (e.g.,
“fred_MG.java”). Note that because of prior merges, there may be more than one path to the root from a snapshot; and then the grandma will be the most recent common ancestor of those common ancestors along any of those paths to the root.

###Merge-In
The merge-in command assumes 1) that the user has finished manually fully-merging the R file changes into the corresponding T collision file, for all the collision file pairs, as needed. This includes removing the MR and MG files and removing the “_MT” file suffix. And 2) the user has done no other repo commands since the merge-out command on this project tree. (Commands on other project trees for the same team project can be done, and should not cause a problem.) For example, the 3 “fred_M*.java” files will be used to create a merged “fred.java” file (without the _MT) and the _MR, and _MG files will be removed – all by the user.
Merge-in is merely a duplicate of the check-in command, except that it has a different command name, and because no other commands have been run on the project tree, the merge-in command will always appear as the child of a merge-out command in the repo's set of manifest files. The merge-in manifest contents are equivalent to the check-in manifest file. (Note, if you don't want to create a merge-out manifest file, you must change your “grandma” detection mechanism appropriately.)

###DAG
Because the mom-kid (parent-child) relationships among the manifest files can be a DAG (directed acyclic graph), finding the grandma snapshot (the most recent common ancestor) of the source and the target is a bit more complicated than finding the common ancestor in a tree. If, in searching upward from the source or target snapshot you encounter a merge-out and merge-in pair of snapshots, you will have to follow both parent branches upward toward the root (the create-repo snapshot) because the grandma could be in either one of them. A simple way of doing this is to pick one branch to do immediately and put the other mom-branch's snapshot (or whatever is needed to identify and use it later) on a "pending" list (or array, stack, etc.). You will find a grandma candidate snapshot along every path from your (R or T) snapshot up to the root (create-repo snapshot). It is only the most recent of them that is the actual grandma snapshot for this R-and-T merge.

###Dot-Files
If you find it convenient, you can put VCS files in the user's project tree at its root folder. These files must have a filename beginning with a dot/period, '.', and the prefix “vcsx” for our VCS system. If you decide to do this, make sure that dot-files are not included when you check in a snapshot.

###User Interface
Make sure that you can enter a “command line” in a VCS web page edit box to initiate a command. The command line should include the VCS command name and all arguments needed to process that
command. This is in addition to any fancier GUI mechanisms you have provided. All VCS command should be able to be run via this command line mechanism.


Contents

    /client                         # folder includes all frontend content
        /public                     // includes index.html, manifest.json etc. only index.html list below
            index.html              // index.html, the frontend page
        /src                        // includes all React components
            /actions                // includes redux actions, action types
                actions.js          // redux actions
                actionTypes.js      // action types for route redux reducer
                index.js            // index file
            /components             // often used components
                Input.jsx           // input text field components
                RadioBtn.jsx        // radio button for switch different commands
            /reducers
                rootReducer.js      // redux reducer
            /store
                state.js            // default redux state
                store.js            // redux store
            /styles
                _mixin.scss         // sass mixin function
                styles.scss         // sass styles
            App.jsx                 // Main App component
            Col1.jsx                // Col1, handle command form
            Col2.jsx                // Col2, display all repos
            Col3.jsx                // Col3, display all labels and manifests for particular repo
            index.js                // React entry index.js file
        jsconfig.json               // configure file for React path
        package.json
        package-lock.json
    /.repo                           // all created repos will under this directory
        /project1                   // repo used for demonstration
        /project2                   // repo has a lot of manifest files, demonstration for website scroll
    /routes                         // express routing different commands
        checkin.js                  // check-in command
        checkout.js                 // check-out command
        create.js                   // create-repo command
        fetchData.js                // fetch all repos and their manifest files
        label.js                    // label command
        mergeIn.js                  // merge-in command
        mergeOut.js                 // merge-out command
    /utils                          // backend helper functions
        file_utils.js
        manifest_utils.js
        path_utils.js
        router_utils.js
    package.json
    package-lock.json
    README.txt
    server.js                       // backend main file

External requirements
    Node.js with npm

Development Environment
    Ubuntu      18.04 LTS
    Node.js     v10.16.3

Project Dependencies:   includes in package.json file, list as below
    backend :

    cors                Node.js CORS middleware
    expressjs           Fast, unopinionated, minimalist web framework for node.
    concurrently        Run commands concurrently.
    nodemon             Monitor any changes in application and automatically restart the server

    frontend :

    react               A declarative, efficient, and flexible JavaScript library for building user interfaces.
    material-ui         React components
    redux               A predictable state container for JavaScript apps.
    redux-thunk         Thunk middleware for Redux
    axios               Promise based HTTP client for the browser and node.js
    node-sass           Node.js bindings to libsass
    react-router        Declarative routing for React

Setup and Installation
    // at project root directory, open the terminal, install backend dependencies
    npm install

    // wait until installations completed,
    // change directory to /client, install frontend dependencies
    cd client
    npm install

    // return to the root directory
    cd ..

    // start the project, the browser will pop up automatically
    npm start

Sample invocation & results
    Pre-settled
    1. Already create repo for /543-p1_JPX, the repository in /.repo/project2, initial manifest_0.json
    2. Already modify /543-p1_JPX/index.js, generate manifest_1.json
    3. Already modify /543-p1_JPX/index.js again, generate manifest_2.json

    // starting here
    1. Check out command
        At website, select checkout command
            repo        = project2
            dest        = jun
            manifest    = manifest_0.json
        Click Submit button to checkout.
            jun folder,  will be in the root folder
            manifest_3.json will be generated under /.repo/project2
            the website will update the manifest list

    3. Check in command
        Modify /jun/543-p1_JPX/index.js, with comment // will be manifest_4.json
        At website, select checkin command
            repo        = project2
            // copy the path of jun/543-p1_JPX, linux is fine with this, but different for Windows
            // right click jun/543-p1_JPX  directory, select Copy Path.
            src         = jun/543-p1_JPX
        Click Submit button to checkin.
            manifest_4.json will be generated under /.repo/project2
            the website will update the manifest list
            check /.repo/project2/manifest_log.json,   record each manifest's child node

    4. Label command
        At website, select label command
            repo        = project2
            manifest    = manifest_3.json
            label       = jun3
        Click Submit button to label.
            label.json will be generated under /.repo/project2
            the website will update the manifest list with label.

        Label another manifest
            repo        = project2
            manifest    = manifest_1.json
            label       = origin1
        Click Submit button to label.

    5. Merge-Out command
        Now we just check-in /jun branch with manifest_3.json, we will merge-out manifest_1.json to /jun directory.
        At website, select merge-out command
            repo        = project2
            dest        = jun
            mt          = manifest_3.json
            mr          = manifest_1.json
        Click Submit button

        under jun/543-p1_JPX, index_MG.js, index_MR.js, index_MT.js were generated


    6. Merge-In command
        After remove conflict files, at website, select merge-in command
            repo        = project2
            src         = jun/543-p1_JPX
                            // copy the path of jun/543-p1_JPX, linux is fine with this, but different for Windows
                            // right click jun/543-p1_JPX  directory, select Copy Path.
            mt          = manifest_3.json
            mr          = manifest_1.json
        Click Submit button

    In .repo/project2/manifest_log.json file, record each manifest child node, to search to lowest common ancestor.

Features
    Implement create repo command.
    Implement check-in command.
    Implement check-out command.
    Implement label command.
    Implement merge-out command.
    Implement merge-in command.
    List repos, labels and manifest files in the website.

Bugs
    1.  backend use sync functions, if website submit commands frequently in very short period,
        could not handle traversal all directories, manifest files is lacking file informations,
        Maybe could solve with async function at backend or the submit button is clickable after get
        response from previous command.