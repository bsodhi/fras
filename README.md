# fras
**fras** is a Face Recognition based Attendance System. It is a simple web application built using [Python flask](https://flask.palletsprojects.com/en/1.1.x/)
and [VueJS](https://vuejs.org/).
The face recognition task is accomplished using [face_recognition](https://github.com/ageitgey/face_recognition).

## Development environment setup

### System requirements

1. git client should be installed on your machine.
2. The backend code is written using Python 3.6 or higher
3. SQLite is used for database. You can use other RDBMS if you like.
4. NodeJS stable LTS version. (Can be installed by following these steps: https://nodejs.org/en/download/). We use node for setting up VueJS 
client app (https://cli.vuejs.org/guide/installation.html).
5. We use [Visual Studio Code](https://code.visualstudio.com/) for developing and debugging code. Install 
[Microsoft's Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and 
[VueJS Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extensions.

### Steps to prepare the workspace

1. Create a python virtual environment for this project. See this for how to do it: https://docs.python.org/3/library/venv.html. 
E.g., you can run the following: `python3 -m venv ~/.pyenv/FRAS` to create the virtual environment in `~/.pyenv/FRAS` folder.
3. Open a shell and `cd` into a directory that you want to work in.
4. Clone this git repository: `git clone https://github.com/bsodhi/fras.git`.
5. Run `cd fras` and then `source ~/.pyenv/FRAS/bin/activate` to activate the python virtual environment.
6. ONLY if you are using MySQL: `sudo apt-get install libmysqlclient-dev` to install MySQL client development library. It will be needed when we install the python connector via pip in following steps.
7. Run `pip install -r api_service/requirements.txt`.

    > **NOTE:** Some modules may fail to install due to unavailability of certain native libraries or headers on your OS. You can Google the error text to find a solution.
    
8. Install necessary dependencies for VueJS app:
    1. `cd client_app` 
    1. `npm install`

## Running the application

After setting up the workspace as per the steps listed above you can deploy and run the application. Following are the steps:

1. `cd fras/client_app`
1. Compile the VueJS app: `npm run build`
1. Start the MySQL server (ONLY if you are using MySQL instead of SQLite). 
You may also have to set proper values for the database connection information, and other settings if using other than SQLite.
1. `cd fras/api_service`
1. `source ~/.pyenv/FRAS/bin/activate` to activate the python virtual environment.
1. Run `python` to start a python session, and issue the following commands to setup the database:
    1. `from models import *`
    1. `setup_demo_db()`
    1. Ctrl-D to exit the python session.
1. Run `python fras_app.py config.json` to start the web application.
1. Open `http://localhost:4567/fras/app/index.html`
1. Login using ID `admin` and password `admin` (Or whatever you set via the `setup_demo_db()`)
