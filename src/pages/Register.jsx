import { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
	const [email, setEmail] =useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("false");
	const [mensaje, setMensaje] =useState("");

	const validarDatos = (e)=>{
		e.preventDefault()
		if (!email.trim() || !password.trim() || !confirmPassword.trim()){
			setMensaje("Todos los campos deben de estar completos");
			setError(true);
			return
		}
		if (password.length < 6){
			setMensaje("La contraseña debe de contener más de 6 caracteres");
			setError(true);
			return
		}

		if (password !== confirmPassword){
			setMensaje("La contraseña no coincide con el valor a confirmar");
			setError(true);
			return
		}
		setError(false);
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setMensaje("");
		alert("Formulario enviado correctamente");
	}
  return (
    <>
    	<Container className="mt-5">
    		<h1 className="mt-5">Formulario de Registro</h1>
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
		    	<Row className="mb-3 justify-content-center">
		    		<Col md={6}>
		    			<Form.Label>Confirm Password</Form.Label>
						<Form.Control
						type="text"
						name="confirm_password"
						className="mb-3"
						onChange={(e)=>setConfirmPassword(e.target.value)}
						value = {confirmPassword}
						/>		    			
		    		</Col>
		    	</Row>

				
				<Button 
					type="submit"
					className="btn btn-primary mb-5"
					variant="primary"
					>Enviar
				</Button>				
			</Form>
    	</Container>
	    
    </>
  );
};

export default Register;