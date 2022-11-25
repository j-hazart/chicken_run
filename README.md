# chicken_run

A webservice to manage a chicken_coop.

# Available Commands

`setup`: install the dependencies we need
`start`: run the server
`dev`: run the server in dev mode

# Import the database

In mysql `source database.js`

# Requests [GET]

**Get all chickens :**
http://localhost/chickens

**Get chicken by name:**
http://localhost/chickens/cocotte

**Get items in stock:**
http://localhost/stock
http://localhost/stock?name=cocotte&item=egg

# Requests [POST]

**Add a chicken :**
http://localhost/chickens

body:
{
"name":"cocotte",
"weight": 2
}

# Requests [PUT]

**Edit a chicken by name:**
http://localhost/chickens/cocotte

body:
{
"name":"cocotte",
"birthday":"2022-05-23",
"weight": 2
}

# Requests [PATCH]

**Make all chickens run :**
http://localhost/chickens/run

# Requests [DELETE]

**Delete a chicken by name :**
http://localhost/chickens/cocotte
