import 'dotenv/config'
import { Server } from "socket.io"
import { createServer } from "node:http"
import express from "express"
const PORT = process.env.PORT

const app = express()
const server = createServer( app )
const io = new Server( server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
} )

const GROUP = 'group'

io.on( "connection", ( socket ) =>
{
    console.log( "a user connected", socket.id )


    socket.on( 'joinRoom', async ( userName ) =>
    {
        // join the group chat 
        await socket.join( GROUP )
        // log the join
        // console.log( `${ userName } joined the group` )


        // send room notice to all users in the group
        // io.to( GROUP ).emit( 'roomNotice', userName )

        // broadcast to others in the group
        socket.to( GROUP ).emit( 'roomNotice', userName )
    } )

    socket.on('ChatMessage', async ( msg ) =>
    {
        // console.log( `Message sent by ${ socket.id }: ${ msg }` )
        socket.to( GROUP ).emit( 'ChatMessage', msg )
    } )

    socket.on('typing', async ( userName ) =>
    {
        // console.log( `${ userName } is typing` )
        socket.to( GROUP ).emit( 'typing', userName )
    } )

    socket.on('stopTyping', async ( userName ) =>
    {
        // console.log( `${ userName } stopped typing` )
        socket.to( GROUP ).emit( 'stopTyping', userName )
    } )



} )


app.get( "/", ( req, res ) =>
{
    res.json( { message: "Hello World!" } )
} )

server.listen( PORT, () =>
{
    console.log( `Server running on port ${ PORT }` )
} )
