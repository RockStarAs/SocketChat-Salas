class Usuarios{
    constructor(){
        this.personas = [];
    }
    
    agregarPersona(id,nombre , sala ){
        let persona = {id,nombre, sala };

        this.personas.push(persona);

        return this.getPersonasxSala(sala);
    }

    getPersona(id){
        let persona = this.personas.filter( persona => persona.id === id)[0];
        return persona;
    }
    getPersonasxSala(sala){
        let personas = this.personas.filter( persona => String(persona.sala) === String(sala));
        return personas;
    }
    getPersonas(){
        return this.personas;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona=> persona.id !== id);        
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}