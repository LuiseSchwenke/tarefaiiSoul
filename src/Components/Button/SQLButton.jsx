import React from 'react';

const SQLButton = ({ onSubmit }) => {

  return (
    <>
    <button 
        type="button"
        className='btn btn-primary'
        onClick={onSubmit}
        >
            Enviar dados
    </button>
    </>
  )
}

export default SQLButton