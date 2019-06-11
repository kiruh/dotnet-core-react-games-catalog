# ASP.NET Core & React Games Catalog

This project was created as a homework at Plovdiv University.

Backend is implemented with ASP.NET; Frontend is implemented with React.

In application users can view new games. Administrators can manage content.

## Install locally

`git clone git@github.com:kiruh/games.git && cd games`

#### Install packages

`dotnet restore`

#### Connect MySQL

In **appsettings.json** change server, userid, password and db name of the database you want to connect

```
{
    ...
    DefaultConnection: "server=localhost;userid=root;password=;database=games;"
    ...
}
```

#### Apply migrations

`dotnet ef database update`

#### Run

`dotnet run`

Go to http://localhost:5000
