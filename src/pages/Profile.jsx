//import { useState } from "react";

const Profile = () => {
  return (
    <>
      <div style={styles.container}>
        <h2>Perfil de Usuario</h2>
        <p><strong>Email: rodolfo.lazo@yahoo.com</strong> </p>

        <button  style={styles.button}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    padding: '20px',
    maxWidth: '300px',
    margin: '40px auto',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'    
  },
  button: {
    backgroundColor: '#ff4c4c',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px'
  }
};

export default Profile;