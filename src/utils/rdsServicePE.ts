export class RDSService {
  async save(): Promise<void> {
    // Simulando una operación de guardado en RDS con MySQL
    console.log(
      'Saving the Peru appointment to RDS (MySQL) with the following model:'
    );
    console.log({
      table: 'appointments',
      columns: {
        insuredId: 'VARCHAR(255)',
        centerId: 'VARCHAR(255)',
        specialtyId: 'VARCHAR(255)',
        medicId: 'VARCHAR(255)',
        appointmentDate: 'DATETIME'
      }
    });
  }
}
