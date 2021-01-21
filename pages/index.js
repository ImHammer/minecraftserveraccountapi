
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Form } from '@unform/web'
import Input from '../components/Input'

function User({ user })
{
	return (
		<div>
			<div>Id: {user.id}</div>
			<div>Username: {user.name}</div>
			<div>Coins: {user.coins}</div>
		</div>
	)
}

function Home()
{
	const [user, setUser] = useState(undefined)

	function handleSubmit({ name }){
		fetch(`http://localhost:3000/api/user?name=${name}`, { method: 'GET' }).then(response => {
			console.log(response)
			response.json().then(data => setUser(data))
		}).catch(error => {
			alert(error)
		})
	}
	return (
		<>
			<Head>
				<title>Servidor</title>
			</Head>
			<Form onSubmit={handleSubmit}>
				<Input name='name' type='textt' placeholder='Nickname' />
				<button type='submit' >Search</button>
			</Form>
			
			{
				typeof(user) != 'undefined'
					? <User user={user} />
					: ''
			}
		</>
	)
}

export default Home