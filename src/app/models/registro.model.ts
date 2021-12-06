export class Registro {
  public format: string;
  public text: string;
  public type: string;
  public icon: string;
  public created: Date;
  public profesor: string;
  public avatar: string;
  public asignatura: string;  
  public seccion: string;
  public correo: string;
  public asiste: boolean; 
  

  constructor(format: string, text: string, profesor: string, avatar: string, asignatura: string, seccion: string, correo: string, asiste: boolean) {
    this.format = format;
    this.text = text;
    this.profesor = profesor;
    this.avatar = avatar;
    this.asignatura = asignatura;
    this.seccion = seccion;
    this.correo = correo;
    this.asiste = asiste;
    this.created = new Date();
    this.determinarTipo();    
  }

  private determinarTipo(){
    const inicioTexto = this.text.substr( 0, 4 );
    switch ( inicioTexto ) {

      case 'http':
        this.type = 'http';
        this.icon = 'globe';
      break;

      case 'user':
        this.type = 'user';
        this.icon = 'school-outline';
      break;

      case 'doce':
        this.type = 'doce';
        this.icon = 'person-circle-outline';        
      break;

      case 'geo:':
        this.type = 'geo';
        this.icon = 'pin';
      break;

      default:
        this.type = 'No reconocido';
        this.icon = 'create';
    }
  }

  

}
