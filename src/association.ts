import { Appointment } from './appointment/appointment.model.js';
import { Pet } from './pet/pet.model.js';
import { Professional } from './professional/professional.model.js';
import { Facility } from './facility/facility.model.js';

Pet.hasMany(Appointment, { foreignKey: 'petId' });
Appointment.belongsTo(Pet, { foreignKey: 'petId' });

Professional.hasMany(Appointment, { foreignKey: 'professionalId' });
Appointment.belongsTo(Professional, { foreignKey: 'professionalId' });

Facility.hasMany(Appointment, { foreignKey: 'facilityId' });
Appointment.belongsTo(Facility, { foreignKey: 'facilityId' });




