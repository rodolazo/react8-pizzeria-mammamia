import { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { UserContext } from "../context/UserContext";


const Login = () => {
	const [email, setEmail] =useState("");
	const [password, setPassword] = useState("");	
	const [error, setError] = useState("false");
	const [mensaje, setMensaje] =useState("");
	const {login} = useContext(UserContext);

	const validarDatos = (e)=>{
		e.preventDefault()
		if (!email.trim() || !password.trim()){
			setMensaje("Todos los campos deben de estar completos");
			setError(true);
			return
		}
		if (password.length < 6){
			setMensaje("La contraseña debe de contener más de 6 caracteres");
			setError(true);
			return
		}		
		setError(false);
		setEmail("");
		setPassword("");		
		setMensaje("");
		alert("Formulario enviado correctamente");
	}
  return (
    <>
    	<Container className="mt-5">
    		<h1 className="mt-5">Formulario de Login</h1>
    		{error?<p className="error">{mensaje}</p>:null}
		    <Form onSubmit={validarDatos}>
		    	<Row className="mb-3 justify-content-center">
		    		<Col md={6}>
		    			<Form.Label>Email</Form.Label>
						<Form.Control
						type="text"
						name="email"
						className="mb-3"
						onChange={(e)=>setEmail(e.target.value)}
						value = {email}
						/>		    			
		    		</Col>
		    	</Row>
		    	<Row className="mb-3 justify-content-center">
		    		<Col md={6}>
		    			<Form.Label>Password</Form.Label>
						<Form.Control
						type="text"
						name="password"
						className="mb-3"
						onChange={(e)=>setPassword(e.target.value)}
						value = {password}
						/>		    			
		    		</Col>
		    	</Row>
				<Button 
					type="submit"
					onClick={login}
					className="btn btn-primary mb-5"
					variant="primary"
					>Enviar
				</Button>				
			</Form>
    	</Container>
	    
    </>
  );
};

export default Login;