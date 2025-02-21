import { Facility as FacilityModel } from "./facility.model.js";
import { Facility, Facility as FacilityInterface } from "./facility.entity.js";
import { Op } from "sequelize";

export class FacilityRepository {

    public async findAll(): Promise<FacilityInterface[]> {
        const facilities = await FacilityModel.findAll();
        return facilities.map(facility => facility.toJSON() as FacilityInterface);
    }

    public async findOne(item: { id: string }): Promise<FacilityInterface | null> {
        const id = Number.parseInt(item.id);
        if (isNaN(id)) return null;
        const facility = await FacilityModel.findByPk(id);
        return facility ? (facility.toJSON() as FacilityInterface) : null;
    }

    public async add(facilityInput: FacilityInterface): Promise<FacilityInterface> {
        const newFacility = await FacilityModel.create(facilityInput);
        return newFacility.toJSON() as FacilityInterface;
    }

    public async update(id: string, facilityInput: FacilityInterface): Promise<FacilityInterface | null> {
        const facilityId = Number.parseInt(id);

        if (isNaN(facilityId)) return null;

        try {
            const [rowsUpdated] = await FacilityModel.update(facilityInput, {
                where: { id: facilityId },
            });

            console.log(`Rows updated: ${rowsUpdated}`);

            if (rowsUpdated === 0) return null;

            const updatedFacility = await FacilityModel.findByPk(facilityId);
            if (!updatedFacility) return null;

            return updatedFacility.toJSON() as FacilityInterface;
        } catch (error) {
            console.error('Error during update:', error);
            return null;
        }
    }

    public async delete(item: { id: string }): Promise<FacilityInterface | null> {
        const facilityToDelete = await this.findOne(item);

        if (!facilityToDelete) return null;
        await FacilityModel.destroy({
                where: { id: Number.parseInt(item.id) },
        });

        return facilityToDelete;
    }

    public async findByName(name: string): Promise<FacilityInterface[]> {
    const facilities = await FacilityModel.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%` // Usar LIKE para buscar coincidencias
            }
        }
    });
    return facilities.map(facility => facility.toJSON() as FacilityInterface);
}
}