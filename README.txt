Class Number    : CECS 543
Project Name    : VCS Project 2 - Check-Out, Check-In, List, & Label
Team name       : JPX
Team members    : Jun Li, Prathamesh Patil
Intro           : Check-Out, Check-In, List, & Label features of VCS
Contents

    /client                         # folder includes all frontend content
        /public                     # includes index.html, manifest.json etc. only index.html list below
            index.html              # index.html, the frontend page
        /src                        # includes all React components
            /actions                # includes redux actions, action types
                actions.js          # redux actions
                actionTypes.js      # action types for route redux reducer
                index.js            # index file
            /components             # often used components
                Input.jsx           # input text field components
                RadioBtn.jsx        # radio button for switch different commands
            /reducers
                rootReducer.js      # redux reducer
            /store
                state.js            # default redux state
                store.js            # redux store
            /styles
                _mixin.scss         # sass mixin function
                styles.scss         # sass styles
            App.jsx                 # Main App component
            Col1.jsx                # Col1, handle command form
            Col2.jsx                # Col2, display all repos
            Col3.jsx                # Col3, display all labels and manifests for particular repo
            index.js                # React entry index.js file
        jsconfig.json               # configure file for React path
        package.json
        package-lock.json
    /.repo                           # all created repos will under this directory
        /project1                   # repo used for demonstration
        /project2                   # repo has a lot of manifest files, demonstration for website scroll
    /routes                         # express routing different commands
        checkin.js                  # check-in command
        checkout.js                 # check-out command
        create.js                   # create-repo command
        fetchData.js                # fetch all repos and their manifest files
        label.js                    # label command
        mergeIn.js                  # merge-in command
        mergeOut.js                 # merge-out command
    /utils                          # backend helper functions
        file_utils.js
        manifest_utils.js
        path_utils.js
        router_utils.js
    package.json
    package-lock.json
    README.txt
    server.js                       # backend main file

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
    # at project root directory, open the terminal, install backend dependencies
    npm install

    # wait until installations completed,
    # change directory to /client, install frontend dependencies
    cd client
    npm install

    # return to the root directory
    cd ..

    # start the project, the browser will pop up automatically
    npm start

Sample invocation & results
    Pre-settled
    1. Already create repo for /543-p1_JPX, the repository in /.repo/project2, initial manifest_0.json
    2. Already modify /543-p1_JPX/index.js, generate manifest_1.json
    3. Already modify /543-p1_JPX/index.js again, generate manifest_2.json

    # starting here
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
            # copy the path of jun/543-p1_JPX, linux is fine with this, but different for Windows
            # right click jun/543-p1_JPX  directory, select Copy Path.
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
                            # copy the path of jun/543-p1_JPX, linux is fine with this, but different for Windows
                            # right click jun/543-p1_JPX  directory, select Copy Path.
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