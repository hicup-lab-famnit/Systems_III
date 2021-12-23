const express = require('express')
const users = express.Router()

const DB=require('../DB/dbConn')


users.post('/login', async (req, res)=>{
    var username = req.body.username
    var password = req.body.password

    if(username && password)
    {
        try 
        {
            let queryResult= await DB.AuthUser(username)
            if(queryResult.length>0)
            {
                if(password===queryResult[0].user_password)
                {
                     console.log(queryResult)
                     console.log("SESSION VALID");
                }
                else 
                {
                    console.log("Incorrect password!!")
                }
            }
            else
            {
                console.log("User is not regiestered...")
            }
        }
        catch (err)
        {
            console.log(err)
            res.sendStatus(500)
        }
    }
    else
    {
        console.log("Please enter an Username and Password")
    }
    res.end()
})

users.post('/register', async (req, res)=>{
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    if(username && password && email)
    {
        try
        {
            let queryResult = await DB.AddUser(username,email,password)
            if(queryResult.affectedRows)
            {
                console.log("New user added!!!")
            }
    
        }
        catch(err)
        {
            console.log(err)
            res.sendStatus(500)
        }

    }
    else
    {
        console.log("A field is missing...")
    }
res.end()
})

module.exports = users
